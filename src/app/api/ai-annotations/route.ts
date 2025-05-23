import { NextRequest, NextResponse } from "next/server";
import {
  createImageAnnotation,
  getImageAnnotations,
} from "@/services/image-annotation";

// 创建图片标注
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 验证必要字段
    if (!data.imageId || !data.imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields: imageId, imageUrl" },
        { status: 400 }
      );
    }

    const result = await createImageAnnotation(
      data.imageId,
      data.imageUrl,
      data.customPrompt
    );

    return NextResponse.json({
      success: result.success,
      annotation: result.annotation,
      tagIds: result.tagIds,
      error: result.error,
    });
  } catch (error) {
    console.error("Error creating image annotation:", error);
    return NextResponse.json(
      { error: "Failed to create image annotation" },
      { status: 500 }
    );
  }
}

// 获取图片标注信息
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get("imageId");

    if (!imageId) {
      return NextResponse.json(
        { error: "Missing imageId parameter" },
        { status: 400 }
      );
    }

    // 获取图片标注
    const annotations = await getImageAnnotations(imageId);
    return NextResponse.json({ annotations });
  } catch (error) {
    console.error("Error handling GET request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 