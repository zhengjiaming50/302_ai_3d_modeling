import { ImageTaggingService } from "@/services/imageTagging";
import { NextRequest, NextResponse } from "next/server";

/**
 * 图片标注API端点
 * POST /api/images/tag
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

    // 调用标注服务对图片进行标注并存储到数据库
    const tagResponse = await ImageTaggingService.tagAndStoreImage(
      imageId,
      imageUrl
    );

    return NextResponse.json({
      success: true,
      tags: tagResponse.tags,
    });
  } catch (error) {
    console.error("Error in image tagging API:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * 获取图片标签API端点
 * GET /api/images/tag?imageId=xxx
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const imageId = searchParams.get("imageId");

    if (!imageId) {
      return NextResponse.json({ error: "Missing imageId" }, { status: 400 });
    }

    // 获取图片标签
    const tags = await ImageTaggingService.getImageTags(imageId);

    return NextResponse.json({
      success: true,
      tags: tags,
    });
  } catch (error) {
    console.error("Error getting image tags:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
