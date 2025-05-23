import { z } from "zod";
import { env } from "@/env";

// SiliconFlow视觉AI响应数据结构
export const SiliconFlowVisionResponseSchema = z.object({
  id: z.string(),
  object: z.string(),
  created: z.number(),
  model: z.string(),
  choices: z.array(
    z.object({
      index: z.number(),
      message: z.object({
        role: z.string(),
        content: z.string(),
      }),
      finish_reason: z.string(),
    })
  ),
  usage: z.object({
    prompt_tokens: z.number(),
    completion_tokens: z.number(),
    total_tokens: z.number(),
  }),
});

export type SiliconFlowVisionResponse = z.infer<typeof SiliconFlowVisionResponseSchema>;

// 图片标注结果数据结构
export const ImageAnnotationSchema = z.object({
  tags: z.array(z.string()),
  description: z.string(),
  confidence: z.number().optional(),
});

export type ImageAnnotation = z.infer<typeof ImageAnnotationSchema>;

/**
 * 调用SiliconFlow视觉AI分析图片
 * @param imageUrl 图片URL
 * @param customPrompt 可选的自定义提示词
 * @returns 图片分析结果
 */
export async function analyzeImageWithSiliconFlow(
  imageUrl: string,
  customPrompt?: string
): Promise<ImageAnnotation> {
  const apiKey = env.SILICONFLOW_API_KEY;
  
  if (!apiKey) {
    throw new Error("SILICONFLOW_API_KEY not configured");
  }

  // 简化的分析提示词 - 让AI自然描述个体特征
  const defaultPrompt = `请详细描述这张图片中人物的个体特征，专注于能够区分不同个体的独特特征：

重点描述人物的面部特征（脸型、眼部、鼻部、嘴部、额头、下巴等）、身材特征（体型、身高比例、肩膀宽度等）、头发特征（发色、发质、发型、发量等）、皮肤特征（肤色、肤质、明显的痣或疤痕等）以及年龄特征等。

请避免描述服装、场景、职业等外在因素，专注于人物本身不可改变的生理特征。用自然的语言描述，不需要特定格式。`;

  const prompt = customPrompt || defaultPrompt;

  try {
    const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "Qwen/Qwen2-VL-72B-Instruct", // 使用Qwen视觉模型
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                  detail: "high", // 高质量分析
                },
              },
              {
                type: "text",
                text: prompt,
              },
            ],
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`SiliconFlow API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const validatedData = SiliconFlowVisionResponseSchema.parse(data);
    
    // 解析响应内容
    const content = validatedData.choices[0]?.message?.content || "";
    
    return parseAnalysisResult(content);
  } catch (error) {
    console.error("Error calling SiliconFlow Vision API:", error);
    throw new Error(`Failed to analyze image: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
}

/**
 * 解析AI分析结果，将整个描述作为一个标签
 * @param content AI返回的内容
 * @returns 格式化的标注数据
 */
function parseAnalysisResult(content: string): ImageAnnotation {
  // 清理内容，去除多余的换行和空格
  const cleanedContent = content.trim().replace(/\n+/g, ' ').replace(/\s+/g, ' ');
  
  // 如果内容为空，使用默认描述
  const description = cleanedContent || "个体特征分析结果";
  
  return {
    tags: [description], // 将整个描述作为一个标签
    description: description, // 描述与标签相同
    confidence: 0.8, // 默认置信度
  };
} 