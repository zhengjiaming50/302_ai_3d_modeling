import { NextRequest, NextResponse } from "next/server";
import { ImageModel } from "@/models";
import { saveFileFromUrl } from "@/lib/file-storage";
import { triggerImageAnnotation } from "@/services/image-annotation";

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
      console.log(`Image file saved locally: ${localFilePath}`);
    } catch (fileError) {
      console.error("Failed to save image file locally:", fileError);
      // 继续创建记录，但不包含本地文件路径
    }

    // 创建图片记录
    const image = await ImageModel.create({
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      localFilePath, // 添加本地文件路径
      mimeType: data.mimeType || "image/png",
      size: data.size,
    });

    // 触发AI标注处理（异步，不阻塞响应）
    try {
      await triggerImageAnnotation(image.id, image.fileUrl);
      console.log(`AI annotation triggered for image ${image.id}`);
    } catch (annotationError) {
      console.error(`Failed to trigger annotation for image ${image.id}:`, annotationError);
      // 不影响主流程，继续返回成功响应
    }

    return NextResponse.json({
      id: image.id,
      localFilePath: image.localFilePath,
      success: true,
    });
  } catch (error) {
    console.error("Error saving image to database:", error);
    return NextResponse.json(
      { error: "Failed to save image to database" },
      { status: 500 }
    );
  }
}

// 获取图片信息
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      // 获取特定图片
      const image = await ImageModel.findById(id);
      if (!image) {
        return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }
      return NextResponse.json(image);
    } else {
      // 获取所有图片列表
      const limit = parseInt(searchParams.get("limit") || "20");
      const offset = parseInt(searchParams.get("offset") || "0");
      const images = await ImageModel.findAll(limit, offset);
      return NextResponse.json(images);
    }
  } catch (error) {
    console.error("Error fetching image(s) from database:", error);
    return NextResponse.json(
      { error: "Failed to fetch image data" },
      { status: 500 }
    );
  }
}
