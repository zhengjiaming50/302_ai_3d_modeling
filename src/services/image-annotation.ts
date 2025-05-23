import { analyzeImageWithSiliconFlow, ImageAnnotation } from "./siliconflow-vision";
import { ImageModel, AITagModel, AITagImageModel } from "@/models";

/**
 * 为图片创建AI标注
 * @param imageId 图片ID
 * @param imageUrl 图片URL
 * @param customPrompt 可选的自定义提示词
 * @returns 标注结果
 */
export async function createImageAnnotation(
  imageId: string,
  imageUrl: string,
  customPrompt?: string
): Promise<{
  annotation: ImageAnnotation;
  tagIds: string[];
  success: boolean;
  error?: string;
}> {
  try {
    // console.log(`Starting image annotation for image ${imageId}...`);
    
    // 调用SiliconFlow AI分析图片
    const annotation = await analyzeImageWithSiliconFlow(imageUrl, customPrompt);
    
    // console.log(`AI analysis completed for image ${imageId}:`, annotation);
    
    // 存储标签到数据库（直接创建新标签，不查找已存在的）
    const tagIds: string[] = [];
    
    // 由于现在tags数组只包含一个完整描述，我们只需要处理这一个标签
    const description = annotation.tags[0] || "个体特征分析结果";
    
    try {
      // 直接创建新标签（每个图片都有独特的描述）
      const tag = await AITagModel.create({
        name: description,
        description: `AI生成的个体特征描述，图片ID: ${imageId}`,
        category: "ai_generated",
      });
      
      tagIds.push(tag.id);
      
      // 创建图片-标签关联
      await AITagImageModel.addTagToImage(
        imageId,
        tag.id,
        annotation.confidence
      );
      
      // console.log(`Feature description created and associated with image ${imageId}`);
    } catch (tagError) {
      console.error(`Error processing feature description:`, tagError);
    }
    
    return {
      annotation,
      tagIds,
      success: true,
    };
  } catch (error) {
    console.error(`Error creating annotation for image ${imageId}:`, error);
    return {
      annotation: {
        tags: ["个体特征分析失败"],
        description: "标注失败",
        confidence: 0,
      },
      tagIds: [],
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * 触发图片标注处理（在图片上传后调用）
 * @param imageId 图片ID
 * @param imageUrl 图片URL
 * @returns 处理结果
 */
export async function triggerImageAnnotation(
  imageId: string,
  imageUrl: string
): Promise<void> {
  try {
    // 异步处理标注，不阻塞主流程
    setImmediate(async () => {
      try {
        await createImageAnnotation(imageId, imageUrl);
        // console.log(`Image annotation completed for ${imageId}`);
      } catch (error) {
        console.error(`Background annotation failed for ${imageId}:`, error);
      }
    });
  } catch (error) {
    console.error(`Error triggering annotation for ${imageId}:`, error);
  }
}

/**
 * 获取图片的标注信息
 * @param imageId 图片ID
 * @returns 标注信息
 */
export async function getImageAnnotations(imageId: string) {
  try {
    // 获取图片关联的AI标签（现在通常只有一个）
    const tagAssociations = await AITagImageModel.findByImageId(imageId);
    
    const annotations = [];
    for (const association of tagAssociations) {
      const tag = await AITagModel.findById(association.tagId);
      if (tag) {
        annotations.push({
          tag: tag.name, // 这现在是完整的特征描述
          description: tag.description || "",
          confidence: association.confidence || 0,
          createdAt: association.createdAt,
        });
      }
    }
    
    return annotations;
  } catch (error) {
    console.error(`Error fetching annotations for image ${imageId}:`, error);
    return [];
  }
} 