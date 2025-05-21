import { ImageModel } from "@/models/image";
import { ModelModel } from "@/models/model";
import { ComparisonModel } from "@/models/comparison";
import { compareSiliconFlowImages } from "@/services/siliconflow";
import { NextRequest, NextResponse } from "next/server";

/**
 * 图片比较API端点
 * POST /api/images/compare
 * 用于比较当前上传的图片与历史图片，找出最相似的一张
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageId, imageUrl } = body;

    if (!imageId || !imageUrl) {
      return NextResponse.json(
        { error: "Missing imageId or imageUrl" },
        { status: 400 }
      );
    }

    // 获取所有已有的图片（排除当前上传的图片）
    const allImages = await ImageModel.findAll(100, 0);
    const previousImages = allImages
      .filter((img) => img.id !== imageId)
      .map((img) => ({
        imageId: img.id,
        imageUrl: img.fileUrl,
      }));

    if (previousImages.length === 0) {
      return NextResponse.json({
        success: false,
        message: "没有足够的历史图片进行比较",
      });
    }

    // 调用SiliconFlow API比较图片相似度
    const comparisonResult = await compareSiliconFlowImages(
      imageUrl,
      previousImages
    );

    // 获取匹配图片对应的模型
    const matchedModel = await ModelModel.findByImageId(
      comparisonResult.matchedImageId
    );

    if (!matchedModel) {
      return NextResponse.json({
        success: false,
        message: "找到相似图片，但未找到对应的3D模型",
      });
    }

    // 保存比较记录到数据库
    const comparisonRecord = await ComparisonModel.create({
      uploadedImageId: imageId,
      matchedModelId: matchedModel.id,
      similarityScore: comparisonResult.similarityScore,
    });

    return NextResponse.json({
      success: true,
      comparisonId: comparisonRecord.id,
      matchedImage: {
        id: comparisonResult.matchedImageId,
        similarityScore: comparisonResult.similarityScore,
      },
      matchedModel: {
        id: matchedModel.id,
        fileUrl: matchedModel.fileUrl,
        fileName: matchedModel.fileName,
      },
    });
  } catch (error) {
    console.error("Error in image comparison API:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
