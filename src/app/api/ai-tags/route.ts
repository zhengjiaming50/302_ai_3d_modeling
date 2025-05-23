import { NextRequest, NextResponse } from "next/server";
import { AITagModel, AITagImageModel } from "@/models";
import { visionAIService } from "@/services/vision-ai";

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

    // 检查视觉AI服务是否可用
    if (!visionAIService.isAvailable()) {
      console.warn('Vision AI service not available, skipping AI tagging');
      return NextResponse.json({
        success: true,
        message: "Vision AI service not configured, skipping AI tagging",
        tags: []
      });
    }

    try {
      // 调用视觉AI分析图片
      console.log(`Analyzing image with Vision AI: ${data.imageUrl}`);
      const analysisResult = await visionAIService.analyzeImage(data.imageUrl);

      const createdTags: string[] = [];

      // 处理分析结果中的标签
      for (const tagName of analysisResult.tags) {
        if (!tagName.trim()) continue;

        try {
          // 查找或创建标签
          const tag = await AITagModel.findOrCreate({
            name: tagName.trim(),
            description: `AI生成的标签 - ${analysisResult.description.substring(0, 100)}`,
            category: 'vision-ai'
          });

          // 创建图片-标签关联
          await AITagImageModel.addTagToImage(
            data.imageId,
            tag.id,
            analysisResult.confidence
          );

          createdTags.push(tag.name);
        } catch (tagError) {
          console.error(`Error processing tag "${tagName}":`, tagError);
          // 继续处理其他标签，不因单个标签失败而中断
        }
      }

      // 可选：创建一个描述标签
      if (analysisResult.description) {
        try {
          const descriptionTag = await AITagModel.findOrCreate({
            name: 'AI描述',
            description: analysisResult.description,
            category: 'vision-ai-description'
          });

          await AITagImageModel.addTagToImage(
            data.imageId,
            descriptionTag.id,
            analysisResult.confidence
          );

          createdTags.push(descriptionTag.name);
        } catch (descError) {
          console.error('Error creating description tag:', descError);
        }
      }

      console.log(`Successfully processed AI tags for image ${data.imageId}: ${createdTags.join(', ')}`);

      return NextResponse.json({
        success: true,
        message: "AI tagging completed successfully",
        tags: createdTags,
        description: analysisResult.description,
        confidence: analysisResult.confidence
      });

    } catch (aiError) {
      console.error("Error with Vision AI analysis:", aiError);
      
      // AI分析失败不应该阻止整个流程，返回警告信息
      return NextResponse.json({
        success: true,
        message: "AI tagging failed, but image was processed successfully",
        error: aiError instanceof Error ? aiError.message : 'Unknown AI error',
        tags: []
      }, { status: 200 }); // 使用200状态码，因为图片处理本身成功了
    }

  } catch (error) {
    console.error("Error in AI tagging endpoint:", error);
    return NextResponse.json(
      { 
        error: "Failed to process AI tagging request",
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// 获取图片的AI标签
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

    // 获取图片的所有AI标签
    const tags = await AITagModel.findByImageId(imageId);

    return NextResponse.json({
      imageId,
      tags: tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        description: tag.description,
        category: tag.category,
        createdAt: tag.createdAt
      }))
    });

  } catch (error) {
    console.error("Error fetching AI tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch AI tags" },
      { status: 500 }
    );
  }
} 