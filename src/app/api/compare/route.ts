import { NextRequest, NextResponse } from "next/server";
import { ImageModel, ModelModel, AITagModel, ComparisonModel } from "@/models";
import { visionAIService, VisionComparisonRequest } from "@/services/vision-ai";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 验证必要字段
    if (!data.imageUrl) {
      return NextResponse.json(
        { error: "Missing required field: imageUrl" },
        { status: 400 }
      );
    }

    // 检查视觉AI服务是否可用
    if (!visionAIService.isAvailable()) {
      return NextResponse.json(
        { error: "Vision AI service not configured" },
        { status: 503 }
      );
    }

    try {
      // 获取所有有关联模型的历史图片及其AI标签
      const historicalImages = await getHistoricalImagesWithTags();

      if (historicalImages.length === 0) {
        return NextResponse.json({
          success: false,
          message: "No historical images with AI tags found for comparison",
          similarModel: null
        });
      }

      // 准备比较请求
      const comparisonRequest: VisionComparisonRequest = {
        targetImageUrl: data.imageUrl,
        historicalImages: historicalImages.map(img => ({
          id: img.id,
          description: img.description || '',
          tags: img.tags
        }))
      };

      // 调用视觉AI进行比较
      console.log(`Comparing image with ${historicalImages.length} historical images`);
      const comparisonResult = await visionAIService.compareWithHistoricalImages(comparisonRequest);

      // 找到最相似的图片对应的模型
      const selectedImage = historicalImages.find(img => img.id === comparisonResult.mostSimilarImageId);

      if (!selectedImage) {
        return NextResponse.json({
          success: false,
          message: "Could not find the selected similar image",
          similarModel: null
        });
      }

      // 获取对应的3D模型信息
      const model = await ModelModel.findByImageId(selectedImage.id);

      if (!model) {
        return NextResponse.json({
          success: false,
          message: "No 3D model found for the similar image",
          similarModel: null
        });
      }

      // 可选：保存对比记录
      try {
        if (data.uploadedImageId) {
          await ComparisonModel.create({
            uploadedImageId: data.uploadedImageId,
            matchedModelId: model.id,
            similarityScore: comparisonResult.confidence
          });
        }
      } catch (recordError) {
        console.error('Error saving comparison record:', recordError);
        // 不影响主要结果
      }

      console.log(`Found similar model: ${model.fileName} (confidence: ${comparisonResult.confidence})`);

      return NextResponse.json({
        success: true,
        message: "Similar model found successfully",
        similarModel: {
          id: model.id,
          fileName: model.fileName,
          fileUrl: model.fileUrl,
          localFilePath: model.localFilePath,
          format: model.format,
          createdAt: model.createdAt,
          originalImage: {
            id: selectedImage.id,
            fileName: selectedImage.fileName,
            fileUrl: selectedImage.fileUrl,
            localFilePath: selectedImage.localFilePath
          }
        },
        comparison: {
          confidence: comparisonResult.confidence,
          reason: comparisonResult.reason,
          matchedImageId: selectedImage.id
        }
      });

    } catch (aiError) {
      console.error("Error with Vision AI comparison:", aiError);
      return NextResponse.json(
        { 
          error: "Failed to perform AI comparison",
          details: aiError instanceof Error ? aiError.message : 'Unknown AI error'
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error("Error in comparison endpoint:", error);
    return NextResponse.json(
      { 
        error: "Failed to process comparison request",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * 获取所有有关联模型的历史图片及其AI标签
 */
async function getHistoricalImagesWithTags() {
  try {
    // 获取所有有关联模型的图片
    const images = await ImageModel.findAll(1000, 0); // 获取前1000张图片
    
    const imagesWithModelsAndTags = [];

    for (const image of images) {
      // 检查是否有关联的模型
      const model = await ModelModel.findByImageId(image.id);
      if (!model) continue;

      // 获取AI标签
      const tags = await AITagModel.findByImageId(image.id);
      
      if (tags.length === 0) continue; // 跳过没有AI标签的图片

      // 提取描述和标签
      let description = '';
      const tagNames: string[] = [];

      for (const tag of tags) {
        if (tag.category === 'vision-ai-description') {
          description = tag.description || '';
        } else if (tag.category === 'vision-ai') {
          tagNames.push(tag.name);
        }
      }

      imagesWithModelsAndTags.push({
        id: image.id,
        fileName: image.fileName,
        fileUrl: image.fileUrl,
        localFilePath: image.localFilePath,
        description,
        tags: tagNames,
        modelId: model.id
      });
    }

    console.log(`Found ${imagesWithModelsAndTags.length} historical images with models and AI tags`);
    return imagesWithModelsAndTags;

  } catch (error) {
    console.error('Error getting historical images with tags:', error);
    return [];
  }
} 