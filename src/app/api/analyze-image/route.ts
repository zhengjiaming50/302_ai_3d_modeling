import { NextRequest, NextResponse } from "next/server";
import { SiliconFlowVisionService } from "@/services/ai-vision";

// 这是一个服务器端API路由，可以安全地访问环境变量
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

    // 调用视觉AI服务分析图片
    try {
      const tagIds = await SiliconFlowVisionService.saveImageTagsToDatabase(
        data.imageId,
        data.imageUrl
      );

      return NextResponse.json({
        success: true,
        message: `成功为图片添加${tagIds.length}个标签`,
        tagIds,
      });
    } catch (aiError) {
      console.error("Error analyzing image:", aiError);
      return NextResponse.json(
        { 
          error: "Failed to analyze image",
          message: (aiError as Error).message 
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error processing analyze-image request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 