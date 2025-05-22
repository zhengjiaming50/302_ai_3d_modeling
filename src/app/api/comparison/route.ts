import { NextRequest, NextResponse } from "next/server";
import { SiliconFlowVisionService } from "@/services/ai-vision";
import { ImageModel } from "@/models";
import { ModelModel } from "@/models";
import { ComparisonModel } from "@/models";
import { AITagImageModel } from "@/models";
import { AITagModel } from "@/models";
import { saveFileFromUrl } from "@/lib/file-storage";

/**
 * 处理对比分析请求
 * 用户上传新图片，系统将其与历史图片比较，找到最相似的模型
 */
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证必要字段
    if (!data.fileName || !data.fileUrl) {
      return NextResponse.json(
        { error: "Missing required fields: fileName, fileUrl" },
        { status: 400 }
      );
    }

    // 保存远程文件到本地
    let localFilePath: string | undefined = undefined;
    try {
      localFilePath = await saveFileFromUrl(
        data.fileUrl,
        data.fileName,
        "image"
      );
      console.log(`Comparison image saved locally: ${localFilePath}`);
    } catch (fileError) {
      console.error("Failed to save comparison image locally:", fileError);
      // 继续执行，不阻断流程
    }

    // 创建图片记录
    let uploadedImage;
    try {
      uploadedImage = await ImageModel.create({
        fileName: data.fileName,
        fileUrl: data.fileUrl,
        localFilePath,
        mimeType: data.mimeType || "image/png",
        size: data.size,
      });
    } catch (imageError) {
      console.error("Failed to create image record:", imageError);
      return NextResponse.json(
        { error: "Database error", message: "创建图片记录失败", details: (imageError as Error).message },
        { status: 500 }
      );
    }

    // 获取数据库中所有历史图片
    let historyImages;
    try {
      historyImages = await ImageModel.findAll(1000, 0);
    } catch (queryError) {
      console.error("Failed to query history images:", queryError);
      return NextResponse.json(
        { error: "Database error", message: "查询历史图片失败", details: (queryError as Error).message },
        { status: 500 }
      );
    }
    
    // 过滤掉刚上传的图片
    const filteredHistoryImages = historyImages.filter(img => img.id !== uploadedImage.id);
    
    if (filteredHistoryImages.length === 0) {
      return NextResponse.json({
        success: false,
        message: "没有找到历史图片进行比较",
      });
    }

    // 提取历史图片信息用于比较
    let historyImageInfos;
    try {
      historyImageInfos = await Promise.all(
        filteredHistoryImages.map(async (img) => {
          // 查找与图片关联的模型
          const model = await ModelModel.findByImageId(img.id);
          
          return {
            id: img.id,
            url: img.fileUrl,
            modelId: model?.id || null,
          };
        })
      );
    } catch (modelQueryError) {
      console.error("Failed to query associated models:", modelQueryError);
      return NextResponse.json(
        { error: "Database error", message: "查询关联模型失败", details: (modelQueryError as Error).message },
        { status: 500 }
      );
    }

    // 过滤掉没有关联模型的图片
    const validHistoryImages = historyImageInfos.filter(img => img.modelId !== null);
    
    if (validHistoryImages.length === 0) {
      return NextResponse.json({
        success: false,
        message: "没有找到关联模型的历史图片进行比较",
      });
    }

    // 使用视觉AI标记上传的图片
    try {
      await SiliconFlowVisionService.saveImageTagsToDatabase(
        uploadedImage.id,
        uploadedImage.fileUrl
      );
    } catch (aiError) {
      console.error("Failed to analyze image with AI:", aiError);
      return NextResponse.json(
        { error: "AI service error", message: "AI分析图片失败", details: (aiError as Error).message },
        { status: 500 }
      );
    }

    // 获取上传图片的标签
    let uploadedImageTags;
    try {
      uploadedImageTags = await AITagImageModel.findByImageId(uploadedImage.id);
    } catch (tagQueryError) {
      console.error("Failed to query image tags:", tagQueryError);
      return NextResponse.json(
        { error: "Database error", message: "查询图片标签失败", details: (tagQueryError as Error).message },
        { status: 500 }
      );
    }
    
    if (uploadedImageTags.length === 0) {
      return NextResponse.json({
        success: false,
        message: "无法为上传图片生成标签",
      });
    }

    // 查找所有标签名称
    let uploadedTagDetails;
    try {
      const uploadedTagIds = uploadedImageTags.map(tag => tag.tagId);
      uploadedTagDetails = await Promise.all(
        uploadedTagIds.map(id => AITagModel.findById(id))
      );
    } catch (tagDetailError) {
      console.error("Failed to query tag details:", tagDetailError);
      return NextResponse.json(
        { error: "Database error", message: "查询标签详情失败", details: (tagDetailError as Error).message },
        { status: 500 }
      );
    }
    
    const uploadedTagNames = uploadedTagDetails
      .filter(tag => tag !== null)
      .map(tag => tag!.name);

    // 根据标签匹配计算相似度并找到最匹配的历史图片
    let similarityScores;
    try {
      similarityScores = await Promise.all(
        validHistoryImages.map(async (historyImg) => {
          // 获取历史图片标签
          const historyTags = await AITagImageModel.findByImageId(historyImg.id);
          const historyTagIds = historyTags.map(tag => tag.tagId);
          const historyTagDetails = await Promise.all(
            historyTagIds.map(id => AITagModel.findById(id))
          );
          const historyTagNames = historyTagDetails
            .filter(tag => tag !== null)
            .map(tag => tag!.name);
          
          // 计算共同标签数量
          const commonTags = uploadedTagNames.filter(tag => 
            historyTagNames.includes(tag)
          );
          
          // 计算Jaccard相似度: |A ∩ B| / |A ∪ B|
          const union = new Set([...uploadedTagNames, ...historyTagNames]);
          const similarityScore = commonTags.length / union.size;
          
          return {
            historyImageId: historyImg.id,
            modelId: historyImg.modelId as string,
            similarityScore,
            commonTags
          };
        })
      );
    } catch (similarityError) {
      console.error("Failed to calculate similarity scores:", similarityError);
      return NextResponse.json(
        { error: "Processing error", message: "计算相似度失败", details: (similarityError as Error).message },
        { status: 500 }
      );
    }
    
    // 按相似度排序
    similarityScores.sort((a, b) => b.similarityScore - a.similarityScore);
    
    // 获取最相似的结果
    const bestMatch = similarityScores[0];
    
    if (!bestMatch || bestMatch.similarityScore <= 0) {
      return NextResponse.json({
        success: false,
        message: "没有找到足够相似的图片",
      });
    }
    
    // 获取匹配模型的详细信息
    let matchedModel;
    try {
      matchedModel = await ModelModel.findById(bestMatch.modelId);
    } catch (modelDetailError) {
      console.error("Failed to fetch matched model details:", modelDetailError);
      return NextResponse.json(
        { error: "Database error", message: "获取匹配模型详情失败", details: (modelDetailError as Error).message },
        { status: 500 }
      );
    }
    
    if (!matchedModel) {
      return NextResponse.json({
        success: false,
        message: "无法获取匹配模型的详细信息",
      });
    }
    
    // 记录对比结果
    try {
      const comparison = await ComparisonModel.create({
        uploadedImageId: uploadedImage.id,
        matchedModelId: bestMatch.modelId,
        similarityScore: bestMatch.similarityScore
      });
      
      // 返回对比结果
      return NextResponse.json({
        success: true,
        uploadedImage: {
          id: uploadedImage.id,
          url: uploadedImage.fileUrl
        },
        matchedModel: {
          id: matchedModel.id,
          url: matchedModel.fileUrl,
          fileName: matchedModel.fileName,
          imageId: matchedModel.imageId
        },
        similarityScore: bestMatch.similarityScore,
        commonTags: bestMatch.commonTags,
        comparisonId: comparison.id
      });
    } catch (dbError) {
      console.error("Database error while creating comparison record:", dbError);
      // 即使保存记录失败，也返回匹配结果
      return NextResponse.json({
        success: true,
        warning: "无法保存对比结果，但找到了匹配的模型",
        details: (dbError as Error).message,
        uploadedImage: {
          id: uploadedImage.id,
          url: uploadedImage.fileUrl
        },
        matchedModel: {
          id: matchedModel.id,
          url: matchedModel.fileUrl,
          fileName: matchedModel.fileName,
          imageId: matchedModel.imageId
        },
        similarityScore: bestMatch.similarityScore,
        commonTags: bestMatch.commonTags
      });
    }
  } catch (error) {
    console.error("Error processing comparison request:", error);
    return NextResponse.json(
      { error: "Internal server error", message: (error as Error).message },
      { status: 500 }
    );
  }
}

// 获取对比记录
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // 获取特定对比记录
      const comparison = await ComparisonModel.findById(id);
      if (!comparison) {
        return NextResponse.json({ error: "Comparison not found" }, { status: 404 });
      }
      
      // 获取关联的图片和模型详情
      const uploadedImage = await ImageModel.findById(comparison.uploadedImageId);
      const matchedModel = await ModelModel.findById(comparison.matchedModelId);
      
      return NextResponse.json({
        comparison,
        uploadedImage,
        matchedModel
      });
    } else {
      // 获取所有对比记录列表
      const limit = parseInt(searchParams.get("limit") || "20");
      const offset = parseInt(searchParams.get("offset") || "0");
      const comparisons = await ComparisonModel.findAll(limit, offset);
      return NextResponse.json(comparisons);
    }
  } catch (error) {
    console.error("Error fetching comparison(s) from database:", error);
    return NextResponse.json(
      { error: "Failed to fetch comparison data" },
      { status: 500 }
    );
  }
} 