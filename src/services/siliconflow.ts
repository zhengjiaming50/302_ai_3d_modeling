import { env } from "@/env";
import ky from "ky";
import { z } from "zod";

// SiliconFlow API客户端
export const siliconflowKy = ky.create({
  prefixUrl: env.NEXT_PUBLIC_SILICONFLOW_API_URL,
  timeout: 60000,
  headers: {
    Authorization: `Bearer ${env.NEXT_PUBLIC_SILICONFLOW_API_KEY}`,
    "Content-Type": "application/json",
  },
});

// 视觉模型响应Schema
export const SiliconFlowImageTagResponseSchema = z.object({
  tags: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
      category: z.string().optional(),
      confidence: z.number().optional(),
    })
  ),
  timings: z
    .object({
      inference: z.number(),
    })
    .optional(),
});

export type SiliconFlowImageTagResponse = z.infer<
  typeof SiliconFlowImageTagResponseSchema
>;

// 图像分析API接口
export async function analyzeSiliconFlowImage(
  imageUrl: string
): Promise<SiliconFlowImageTagResponse> {
  try {
    const response = await siliconflowKy
      .post("vision/analysis", {
        json: {
          model: env.NEXT_PUBLIC_SILICONFLOW_MODEL_ID,
          images: [{ url: imageUrl }],
          maxTokens: 1000,
        },
      })
      .json();

    return SiliconFlowImageTagResponseSchema.parse(response);
  } catch (error) {
    console.error("Error analyzing image with SiliconFlow API:", error);
    throw new Error("Failed to analyze image with SiliconFlow API");
  }
}

// 比较图片相似度API接口
export async function compareSiliconFlowImages(
  currentImageUrl: string,
  previousImageIds: { imageId: string; imageUrl: string }[]
): Promise<{ matchedImageId: string; similarityScore: number }> {
  try {
    // 构建所有图片的URL列表，包括当前上传的和历史图片
    const images = [
      { url: currentImageUrl, id: "current" },
      ...previousImageIds.map((item) => ({
        url: item.imageUrl,
        id: item.imageId,
      })),
    ];

    const response = await siliconflowKy
      .post("vision/compare", {
        json: {
          model: env.NEXT_PUBLIC_SILICONFLOW_MODEL_ID,
          images: images,
          targetImageId: "current",
        },
      })
      .json<{
        matches: Array<{
          image_id: string;
          similarity_score: number;
        }>;
      }>();

    // 获取最相似的图片ID（排除当前图片自身）
    const matches = response.matches
      .filter((match) => match.image_id !== "current")
      .sort((a, b) => b.similarity_score - a.similarity_score);

    if (matches.length === 0) {
      throw new Error("No matches found");
    }

    const bestMatch = matches[0];

    return {
      matchedImageId: bestMatch.image_id,
      similarityScore: bestMatch.similarity_score,
    };
  } catch (error) {
    console.error("Error comparing images with SiliconFlow API:", error);
    throw new Error("Failed to compare images with SiliconFlow API");
  }
}
