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
  const defaultPrompt = `请作为一个专业的人脸识别专家，详细分析这张图片中人物的独特个体特征。请提供足够具体和独特的描述，以便能够从众多人中识别出这个特定个体：

**面部结构分析（请提供精确描述）：**
- 脸型：具体的几何形状（如椭圆、方形、心形、钻石形等），长宽比例
- 眼部：眼睛形状（杏眼、凤眼、圆眼等）、大小比例、眼距宽窄、双眼皮情况、眼角形状（上扬/下垂）
- 鼻部：鼻翼宽度、鼻头形状（尖/圆/方）、鼻梁高度和宽度、鼻孔形状
- 嘴部：唇形（薄厚、宽窄）、嘴角形状、人中长短和深度
- 眉毛：眉形（直/弯/挑）、浓密程度、眉峰位置、眉间距
- 下颌线：清晰度、角度、宽窄
- 颧骨：高低、突出程度
- 额头：高低、宽窄、形状（圆润/方正）

**独特标识性特征：**
- 面部的任何不对称特征
- 特殊的面部比例关系
- 独特的表情习惯或肌肉纹理
- 痣、疤痕、酒窝等标识性特征的精确位置和大小
- 皮肤质感和色泽的独特性

**头发特征（具体描述）：**
- 发际线形状（M型、圆形、方形等）
- 发量密度、发质（粗细、卷直程度）
- 发色的具体色调、是否有挑染

**整体比例和结构：**
- 三庭五眼的具体比例关系
- 面部各部位的相对位置和大小关系
- 头部与身体的比例

请避免使用"较为"、"比较"、"适中"等模糊词汇，而是提供具体的、可测量的、独特的特征描述。专注于那些能够将此人与其他人明确区分开来的独特特征。`;

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