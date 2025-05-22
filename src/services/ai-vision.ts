// @ts-expect-error is required here - node-fetch在本环境下需要这个指令
import fetch from 'node-fetch';
import { AITagModel, CreateAITagData } from '../models/aiTag';
import { AITagImageModel } from '../models/aiTagImage';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 视觉AI API配置 - 仅在服务器端使用
const API_KEY = process.env.NEXT_PUBLIC_SILICONFLOW_API_KEY || ''; // 使用正确的环境变量名
const API_BASE_URL = 'https://api.siliconflow.cn/v1';
// 使用文档中确认支持的模型名称
const VISION_MODEL = 'Qwen/Qwen2.5-VL-32B-Instruct';
// 图片大小限制(字节) - 4.5MB，留出一些缓冲空间
const MAX_IMAGE_SIZE = 4.5 * 1024 * 1024;

/**
 * 基本日志类，记录服务调用情况
 */
class Logger {
  static info(message: string, data?: any): void {
    console.log(`[AI-VISION] INFO: ${message}`, data ? data : '');
  }

  static error(message: string, error?: any): void {
    console.error(`[AI-VISION] ERROR: ${message}`, error ? error : '');
  }

  static debug(message: string, data?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[AI-VISION] DEBUG: ${message}`, data ? data : '');
    }
  }

  static warn(message: string, data?: any): void {
    console.warn(`[AI-VISION] WARN: ${message}`, data ? data : '');
  }
}

/**
 * 视觉AI标注请求接口
 */
// eslint-disable-next-line camelcase
interface VisionAIRequest {
  model: string;
  messages: {
    role: string;
    content: Array<{
      type: string;
      image_url?: {
        url: string;
        detail?: string;
      };
      text?: string;
    }>;
  }[];
  max_tokens?: number;
  stream?: boolean;
}

/**
 * 视觉AI标注响应接口
 */
interface VisionAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: {
      role: string;
      content: string;
    };
    index: number;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * 标签分析结果接口
 */
export interface TagAnalysisResult {
  tags: string[];
  description: string;
}

/**
 * 硅基流动视觉AI服务类
 * 提供图片分析和标注功能
 */
export class SiliconFlowVisionService {
  /**
   * 压缩图片并返回base64
   * @param inputBuffer 输入图片buffer
   * @param maxSizeBytes 最大尺寸(字节)
   * @returns base64编码的图片
   */
  private static async compressImage(inputBuffer: Buffer, maxSizeBytes: number): Promise<string> {
    Logger.debug(`开始压缩图片，初始大小: ${inputBuffer.length} bytes`);
    
    // 初始压缩设置
    let quality = 80; // 初始质量
    const maxWidth = 1024; // 最大宽度
    
    // 创建sharp实例
    let sharpInstance = sharp(inputBuffer);
    
    // 获取图片元数据
    const metadata = await sharpInstance.metadata();
    
    // 如果图片很大，先进行尺寸调整
    if (metadata.width && metadata.width > maxWidth) {
      sharpInstance = sharpInstance.resize({ 
        width: maxWidth,
        withoutEnlargement: true
      });
      Logger.debug(`图片尺寸过大，调整宽度至 ${maxWidth}px`);
    }
    
    // 循环尝试压缩直到达到大小要求
    let compressedBuffer: Buffer;
    let attempt = 1;
    const maxAttempts = 5;
    
    do {
      Logger.debug(`压缩尝试 #${attempt}，质量: ${quality}`);
      
      // 转为WebP格式(高压缩比且保持质量)
      compressedBuffer = await sharpInstance
        .webp({ quality })
        .toBuffer();
      
      // 如果还是太大，降低质量，增加压缩率
      if (compressedBuffer.length > maxSizeBytes && attempt < maxAttempts) {
        quality = Math.max(quality - 15, 30); // 降低质量但不低于30
        attempt++;
      } else {
        break;
      }
    } while (true);
    
    // 转为base64
    const base64Image = compressedBuffer.toString('base64');
    const result = `data:image/webp;base64,${base64Image}`;
    
    Logger.debug(`图片压缩完成，最终大小: ${compressedBuffer.length} bytes，压缩率: ${Math.round((1 - compressedBuffer.length / inputBuffer.length) * 100)}%`);
    
    return result;
  }

  /**
   * 将图片URL或本地路径转换为base64编码
   * @param imageUrl 图片URL或本地路径
   * @returns base64编码的图片数据
   */
  private static async getImageAsBase64(imageUrl: string): Promise<string> {
    Logger.info(`处理图片: ${imageUrl.substring(0, 50)}...`);
    
    // 检查是否已经是base64格式
    if (imageUrl.startsWith('data:')) {
      Logger.debug('输入已经是base64格式，检查大小');
      // 提取base64数据部分
      const base64Data = imageUrl.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      
      // 如果已经是base64但太大，需要压缩
      if (buffer.length > MAX_IMAGE_SIZE) {
        Logger.warn(`Base64图片太大 (${buffer.length}字节)，需要压缩`);
        return await this.compressImage(buffer, MAX_IMAGE_SIZE);
      }
      return imageUrl;
    }

    try {
      let imageBuffer: Buffer;
      
      // 检查是否是本地文件路径
      if (imageUrl.startsWith('storage/') || imageUrl.startsWith('./storage/') || fs.existsSync(imageUrl)) {
        const filePath = imageUrl.startsWith('/') ? imageUrl : path.join(process.cwd(), imageUrl);
        Logger.debug(`读取本地文件: ${filePath}`);
        
        try {
          imageBuffer = fs.readFileSync(filePath);
          const mimeType = this.getMimeTypeFromPath(filePath);
          
          // 检查大小并在必要时压缩
          if (imageBuffer.length > MAX_IMAGE_SIZE) {
            Logger.warn(`本地图片太大 (${imageBuffer.length}字节)，需要压缩`);
            return await this.compressImage(imageBuffer, MAX_IMAGE_SIZE);
          } else {
            // 直接转base64
            const base64Image = imageBuffer.toString('base64');
            return `data:${mimeType};base64,${base64Image}`;
          }
        } catch (error) {
          Logger.error('读取本地图片失败', error);
          throw error;
        }
      }

      // 处理远程URL
      Logger.debug(`获取远程URL图片: ${imageUrl}`);
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(`获取图片失败: ${response.status}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
      const contentType = response.headers.get('content-type') || 'image/jpeg';
      
      // 检查大小并在必要时压缩
      if (imageBuffer.length > MAX_IMAGE_SIZE) {
        Logger.warn(`远程图片太大 (${imageBuffer.length}字节)，需要压缩`);
        return await this.compressImage(imageBuffer, MAX_IMAGE_SIZE);
      } else {
        // 直接转base64
        const base64Image = imageBuffer.toString('base64');
        return `data:${contentType};base64,${base64Image}`;
      }
    } catch (error) {
      Logger.error('获取和处理图片失败', error);
      throw new Error(`图片处理失败: ${(error as Error).message}`);
    }
  }

  /**
   * 根据文件路径获取MIME类型
   * @param filePath 文件路径
   * @returns MIME类型
   */
  private static getMimeTypeFromPath(filePath: string): string {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: {[key: string]: string} = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml',
      '.bmp': 'image/bmp'
    };
    return mimeTypes[ext] || 'image/jpeg';
  }

  /**
   * 分析图片并返回标签
   * @param imageUrl 图片URL
   * @returns 标签和描述信息
   */
  static async analyzeImage(imageUrl: string): Promise<TagAnalysisResult> {
    Logger.info('开始分析图片');
    
    try {
      // 检查API密钥是否配置
      if (!API_KEY) {
        Logger.error('API密钥未配置');
        throw new Error('视觉AI API密钥未配置，请在环境变量中设置NEXT_PUBLIC_SILICONFLOW_API_KEY');
      }

      // 将图片转换为base64格式
      Logger.debug('转换图片为base64格式');
      const base64ImageUrl = await this.getImageAsBase64(imageUrl);
      
      // 准备请求数据
      const requestData: VisionAIRequest = {
        model: VISION_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: {
                  url: base64ImageUrl,
                  detail: 'low', // 使用低分辨率模式，减少token消耗
                },
              },
              {
                type: 'text',
                text: '请详细分析这个图片的内容，提取关键特征并返回10个最重要的标签。以JSON格式返回，格式为：{"tags": ["标签1", "标签2", ...], "description": "图片描述"}',
              },
            ],
          },
        ],
        max_tokens: 1000,
        stream: false,
      };

      Logger.debug('发送API请求', { model: VISION_MODEL, detail: 'low' });
      
      // 调用视觉AI API
      const response = await fetch(`${API_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestData),
      });

      // 检查响应状态
      if (!response.ok) {
        const errorText = await response.text();
        Logger.error(`API请求失败: ${response.status}`, errorText);
        throw new Error(`视觉AI API请求失败: ${response.status} ${errorText}`);
      }

      // 解析响应数据
      const data = await response.json() as VisionAIResponse;
      Logger.debug('收到API响应', { id: data.id, usage: data.usage });
      
      const content = data.choices[0]?.message?.content;

      if (!content) {
        Logger.error('API返回内容为空');
        throw new Error('视觉AI未返回有效内容');
      }

      // 提取JSON格式的标签和描述信息
      try {
        Logger.debug('从响应中提取JSON数据');
        // 尝试从返回的文本中提取JSON
        const jsonMatch = content.match(/\{[\s\S]*?\}/);
        if (!jsonMatch) {
          Logger.error('无法提取JSON数据', { content });
          throw new Error('无法从响应中提取JSON数据');
        }

        const result = JSON.parse(jsonMatch[0]) as TagAnalysisResult;
        
        // 确保标签数组存在
        if (!Array.isArray(result.tags)) {
          Logger.warn('响应中没有标签数组，使用空数组');
          result.tags = [];
        }
        
        // 确保描述存在
        if (!result.description) {
          Logger.warn('响应中没有描述，使用空字符串');
          result.description = '';
        }

        Logger.info(`分析成功，提取了${result.tags.length}个标签`);
        return result;
      } catch (jsonError) {
        Logger.error('解析标签JSON失败', jsonError);
        
        // 如果无法解析JSON，则尝试创建一个基本的分析结果
        const fallbackResult = {
          tags: ['未知标签'],
          description: content.substring(0, 500) // 使用前500个字符作为描述
        };
        
        Logger.warn('使用回退结果', fallbackResult);
        return fallbackResult;
      }
    } catch (error) {
      Logger.error('视觉AI分析图片失败', error);
      throw new Error(`视觉AI分析图片失败: ${(error as Error).message}`);
    }
  }

  /**
   * 将图片标注保存到数据库
   * @param imageId 图片ID
   * @param imageUrl 图片URL
   * @returns 保存的标签ID列表
   */
  static async saveImageTagsToDatabase(imageId: string, imageUrl: string): Promise<string[]> {
    Logger.info(`开始保存图片标注，图片ID: ${imageId}`);
    
    try {
      // 分析图片获取标签
      Logger.debug('调用分析图片获取标签');
      const analysisResult = await this.analyzeImage(imageUrl);
      const tagIds: string[] = [];

      // 开始保存标签到数据库
      Logger.info(`开始保存${analysisResult.tags.length}个标签到数据库`);
      for (const tagName of analysisResult.tags) {
        if (!tagName) {
          Logger.warn('跳过空标签');
          continue;
        }

        try {
          // 创建标签数据
          const tagData: CreateAITagData = {
            name: tagName,
            description: analysisResult.description,
            category: 'AI分析'
          };

          // 查找或创建标签
          Logger.debug(`处理标签: ${tagName}`);
          const tag = await AITagModel.findOrCreate(tagData);

          // 将标签与图片关联
          Logger.debug(`将标签 ${tag.id} 关联到图片 ${imageId}`);
          await AITagImageModel.addTagToImage(imageId, tag.id, 1.0); // 置信度设为1.0
          
          tagIds.push(tag.id);
        } catch (err) {
          Logger.error(`保存标签 "${tagName}" 失败`, err);
        }
      }

      Logger.info(`成功保存${tagIds.length}个标签到数据库`);
      return tagIds;
    } catch (error) {
      Logger.error('保存图片标签到数据库失败', error);
      throw new Error(`保存图片标签到数据库失败: ${(error as Error).message}`);
    }
  }
} 