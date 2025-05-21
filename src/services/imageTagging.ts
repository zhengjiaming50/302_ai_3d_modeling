import { AITagModel, CreateAITagData } from "@/models/aiTag";
import { AITagImageModel } from "@/models/aiTagImage";
import {
  analyzeSiliconFlowImage,
  SiliconFlowImageTagResponse,
} from "./siliconflow";

/**
 * 处理图片标注服务
 */
export class ImageTaggingService {
  /**
   * 使用SiliconFlow API对图片进行标注并保存到数据库
   * @param imageId 图片ID
   * @param imageUrl 图片URL
   * @returns 处理后的标签数组
   */
  static async tagAndStoreImage(
    imageId: string,
    imageUrl: string
  ): Promise<SiliconFlowImageTagResponse> {
    try {
      // 调用SiliconFlow API分析图片
      const tagResponse = await analyzeSiliconFlowImage(imageUrl);

      // 保存标签到数据库
      await this.storeImageTags(imageId, tagResponse);

      return tagResponse;
    } catch (error) {
      console.error(`Error tagging image with ID ${imageId}:`, error);
      throw new Error(`Failed to tag image: ${(error as Error).message}`);
    }
  }

  /**
   * 将API返回的标签保存到数据库
   * @param imageId 图片ID
   * @param tagResponse API返回的标签响应
   */
  private static async storeImageTags(
    imageId: string,
    tagResponse: SiliconFlowImageTagResponse
  ): Promise<void> {
    try {
      // 先清除图片已有的标签关联
      await AITagImageModel.removeAllTagsFromImage(imageId);

      // 处理每个标签
      for (const tag of tagResponse.tags) {
        // 创建或查找标签
        const tagData: CreateAITagData = {
          name: tag.name,
          description: tag.description,
          category: tag.category,
        };

        const savedTag = await AITagModel.findOrCreate(tagData);

        // 创建图片与标签的关联
        await AITagImageModel.addTagToImage(
          imageId,
          savedTag.id,
          tag.confidence
        );
      }
    } catch (error) {
      console.error(`Error storing tags for image ${imageId}:`, error);
      throw new Error(
        `Failed to store image tags: ${(error as Error).message}`
      );
    }
  }

  /**
   * 获取图片的所有标签
   * @param imageId 图片ID
   * @returns 标签数组
   */
  static async getImageTags(imageId: string) {
    return await AITagModel.findByImageId(imageId);
  }
}
