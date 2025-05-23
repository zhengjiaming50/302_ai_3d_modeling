import { env } from '@/env';

export interface VisionAnalysisResult {
  description: string;
  tags: string[];
  confidence?: number;
}

export interface VisionComparisonRequest {
  targetImageUrl: string;
  historicalImages: Array<{
    id: string;
    description: string;
    tags: string[];
  }>;
}

export interface VisionComparisonResult {
  mostSimilarImageId: string;
  confidence: number;
  reason: string;
}

/**
 * 硅基流动视觉AI服务类
 */
export class SiliconFlowVisionService {
  private apiKey: string;
  private baseUrl: string = 'https://api.siliconflow.cn/v1';
  private model: string = 'Qwen/Qwen2.5-VL-72B-Instruct';

  constructor() {
    this.apiKey = env.SILICONFLOW_API_KEY || '';
    if (!this.apiKey) {
      console.warn('SiliconFlow API key not configured. Vision AI features will be disabled.');
    }
  }

  /**
   * 分析单张图片，提取描述和标签
   */
  async analyzeImage(imageUrl: string): Promise<VisionAnalysisResult> {
    if (!this.apiKey) {
      throw new Error('SiliconFlow API key not configured');
    }

    const prompt = `请详细分析这张图片，并提供以下信息：
1. 详细描述图片内容（包括人物特征、物体、场景等）
2. 提取5-10个关键标签
3. 评估图片的清晰度和质量

请以JSON格式返回结果：
{
  "description": "详细描述",
  "tags": ["标签1", "标签2", ...],
  "confidence": 0.95
}`;

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: {
                    url: imageUrl,
                    detail: 'high'
                  }
                },
                {
                  type: 'text',
                  text: prompt
                }
              ]
            }
          ],
          max_tokens: 1000,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`SiliconFlow API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from SiliconFlow API');
      }

      // 尝试解析JSON响应
      try {
        const result = JSON.parse(content);
        return {
          description: result.description || '',
          tags: result.tags || [],
          confidence: result.confidence || 0.8
        };
      } catch (parseError) {
        // 如果JSON解析失败，尝试从纯文本中提取信息
        console.warn('Failed to parse JSON response, extracting from text');
        return this.extractFromText(content);
      }
    } catch (error) {
      console.error('Error analyzing image with SiliconFlow:', error);
      throw error;
    }
  }

  /**
   * 比较目标图片与历史图片，找出最相似的
   */
  async compareWithHistoricalImages(request: VisionComparisonRequest): Promise<VisionComparisonResult> {
    if (!this.apiKey) {
      throw new Error('SiliconFlow API key not configured');
    }

    const historicalInfo = request.historicalImages.map(img => 
      `ID: ${img.id}\n描述: ${img.description}\n标签: ${img.tags.join(', ')}`
    ).join('\n\n');

    const prompt = `我需要找到与目标图片最相似的历史图片。

历史图片信息：
${historicalInfo}

请分析目标图片，并与以上历史图片进行比较，找出最相似的一张。

请以JSON格式返回结果：
{
  "mostSimilarImageId": "图片ID",
  "confidence": 0.85,
  "reason": "相似的原因说明"
}`;

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: {
                    url: request.targetImageUrl,
                    detail: 'high'
                  }
                },
                {
                  type: 'text',
                  text: prompt
                }
              ]
            }
          ],
          max_tokens: 500,
          temperature: 0.2
        })
      });

      if (!response.ok) {
        throw new Error(`SiliconFlow API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error('No content received from SiliconFlow API');
      }

      // 尝试解析JSON响应
      try {
        const result = JSON.parse(content);
        return {
          mostSimilarImageId: result.mostSimilarImageId || '',
          confidence: result.confidence || 0.5,
          reason: result.reason || '基于图片特征相似度分析'
        };
      } catch (parseError) {
        console.warn('Failed to parse JSON response for comparison');
        throw new Error('Failed to parse comparison result');
      }
    } catch (error) {
      console.error('Error comparing images with SiliconFlow:', error);
      throw error;
    }
  }

  /**
   * 从纯文本中提取图片分析信息（fallback方法）
   */
  private extractFromText(text: string): VisionAnalysisResult {
    // 简单的文本解析逻辑
    const description = text.substring(0, 500); // 取前500字符作为描述
    
    // 尝试提取标签（假设以某种格式出现）
    const tagMatches = text.match(/标签[：:]\s*(.+?)(?:\n|$)/i);
    let tags: string[] = [];
    
    if (tagMatches) {
      tags = tagMatches[1].split(/[,，、]/).map(tag => tag.trim()).filter(tag => tag.length > 0);
    } else {
      // 如果没有明确的标签格式，提取一些关键词
      const words = text.match(/[\u4e00-\u9fa5]{2,}/g) || [];
      tags = words.slice(0, 5); // 取前5个中文词作为标签
    }

    return {
      description,
      tags,
      confidence: 0.6 // 较低的置信度，因为是从纯文本提取的
    };
  }

  /**
   * 检查服务是否可用
   */
  isAvailable(): boolean {
    return !!this.apiKey;
  }
}

// 创建单例实例
export const visionAIService = new SiliconFlowVisionService(); 