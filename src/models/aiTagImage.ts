import { query, transaction } from '../lib/db';
import { generateId } from '../lib/db-init';

export interface AITagImage {
  id: string;
  imageId: string;
  tagId: string;
  confidence?: number;
  createdAt: Date;
}

export interface CreateAITagImageData {
  imageId: string;
  tagId: string;
  confidence?: number;
}

export class AITagImageModel {
  // 创建标签-图片关联记录
  static async create(data: CreateAITagImageData): Promise<AITagImage> {
    const id = generateId();
    const now = new Date();
    
    await query(
      `INSERT INTO ai_tag_images (id, image_id, tag_id, confidence)
       VALUES (?, ?, ?, ?)`,
      [id, data.imageId, data.tagId, data.confidence || null]
    );
    
    return {
      id,
      imageId: data.imageId,
      tagId: data.tagId,
      confidence: data.confidence,
      createdAt: now
    };
  }
  
  // 查找特定图片和标签的关联
  static async findByImageAndTag(imageId: string, tagId: string): Promise<AITagImage | null> {
    const result = await query<AITagImage[]>(
      `SELECT 
        id, 
        image_id as imageId, 
        tag_id as tagId, 
        confidence, 
        created_at as createdAt
       FROM ai_tag_images
       WHERE image_id = ? AND tag_id = ?`,
      [imageId, tagId]
    );
    
    return result.length ? result[0] : null;
  }
  
  // 查找所有与特定图片关联的标签关系
  static async findByImageId(imageId: string): Promise<AITagImage[]> {
    return await query<AITagImage[]>(
      `SELECT 
        id, 
        image_id as imageId, 
        tag_id as tagId, 
        confidence, 
        created_at as createdAt
       FROM ai_tag_images
       WHERE image_id = ?
       ORDER BY confidence DESC`,
      [imageId]
    );
  }
  
  // 查找所有与特定标签关联的图片关系
  static async findByTagId(tagId: string): Promise<AITagImage[]> {
    return await query<AITagImage[]>(
      `SELECT 
        id, 
        image_id as imageId, 
        tag_id as tagId, 
        confidence, 
        created_at as createdAt
       FROM ai_tag_images
       WHERE tag_id = ?
       ORDER BY confidence DESC`,
      [tagId]
    );
  }
  
  // 添加标签到图片
  static async addTagToImage(imageId: string, tagId: string, confidence?: number): Promise<AITagImage> {
    const existing = await this.findByImageAndTag(imageId, tagId);
    
    if (existing) {
      // 如果已存在关联，可以选择更新confidence
      if (confidence !== undefined) {
        await query(
          `UPDATE ai_tag_images SET confidence = ? WHERE id = ?`,
          [confidence, existing.id]
        );
        
        return {
          ...existing,
          confidence
        };
      }
      
      return existing;
    }
    
    // 创建新关联
    return this.create({
      imageId,
      tagId,
      confidence
    });
  }
  
  // 删除图片标签关联
  static async removeTagFromImage(imageId: string, tagId: string): Promise<boolean> {
    await query(
      'DELETE FROM ai_tag_images WHERE image_id = ? AND tag_id = ?',
      [imageId, tagId]
    );
    
    return true;
  }
  
  // 删除特定图片的所有标签关联
  static async removeAllTagsFromImage(imageId: string): Promise<boolean> {
    await query(
      'DELETE FROM ai_tag_images WHERE image_id = ?',
      [imageId]
    );
    
    return true;
  }
} 