import { NextRequest, NextResponse } from "next/server";
import { ComparisonModel, ImageModel, ModelModel } from "@/models";

// 获取对比记录
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");
    const uploadedImageId = searchParams.get("uploadedImageId");
    const matchedModelId = searchParams.get("matchedModelId");

    let comparisons;

    if (uploadedImageId) {
      // 获取特定上传图片的对比记录
      comparisons = await ComparisonModel.findByUploadedImageId(uploadedImageId);
    } else if (matchedModelId) {
      // 获取特定匹配模型的对比记录
      comparisons = await ComparisonModel.findByMatchedModelId(matchedModelId);
    } else {
      // 获取所有对比记录
      comparisons = await ComparisonModel.findAll(limit, offset);
    }

    // 增强对比记录，包含图片和模型的详细信息
    const enhancedComparisons = await Promise.all(
      comparisons.map(async (comparison) => {
        try {
          const [uploadedImage, matchedModel] = await Promise.all([
            ImageModel.findById(comparison.uploadedImageId),
            ModelModel.findById(comparison.matchedModelId),
          ]);

          let matchedImage = null;
          if (matchedModel) {
            matchedImage = await ImageModel.findById(matchedModel.imageId);
          }

          return {
            ...comparison,
            uploadedImage,
            matchedModel,
            matchedImage,
          };
        } catch (error) {
          console.error(`Error enhancing comparison ${comparison.id}:`, error);
          return comparison;
        }
      })
    );

    return NextResponse.json({
      comparisons: enhancedComparisons,
      total: comparisons.length,
    });
  } catch (error) {
    console.error("Error fetching comparisons:", error);
    return NextResponse.json(
      { error: "Failed to fetch comparison records" },
      { status: 500 }
    );
  }
}

// 删除对比记录
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing comparison ID" },
        { status: 400 }
      );
    }

    const success = await ComparisonModel.delete(id);

    if (!success) {
      return NextResponse.json(
        { error: "Comparison record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting comparison:", error);
    return NextResponse.json(
      { error: "Failed to delete comparison record" },
      { status: 500 }
    );
  }
} 