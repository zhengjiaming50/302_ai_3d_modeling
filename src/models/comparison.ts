import { query, transaction } from '../lib/db';
import { generateId } from '../lib/db-init';

export interface Comparison {
  id: string;
  uploadedImageId: string;
  matchedModelId: string;
  similarityScore?: number;
  createdAt: Date;
}

export interface CreateComparisonData {
  uploadedImageId: string;
  matchedModelId: string;
  similarityScore?: number;
}

export class ComparisonModel {
  // 创建对比记录
  static async create(data: CreateComparisonData): Promise<Comparison> {
    const id = generateId();
    const now = new Date();
    
    await query(
      `INSERT INTO comparisons (id, uploaded_image_id, matched_model_id, similarity_score)
       VALUES (?, ?, ?, ?)`,
      [id, data.uploadedImageId, data.matchedModelId, data.similarityScore || null]
    );
    
    return {
      id,
      uploadedImageId: data.uploadedImageId,
      matchedModelId: data.matchedModelId,
      similarityScore: data.similarityScore,
      createdAt: now
    };
  }
  
  // 通过ID查找对比记录
  static async findById(id: string): Promise<Comparison | null> {
    const result = await query<Comparison[]>(
      `SELECT 
        id, 
        uploaded_image_id as uploadedImageId, 
        matched_model_id as matchedModelId, 
        similarity_score as similarityScore, 
        created_at as createdAt
       FROM comparisons
       WHERE id = ?`,
      [id]
    );
    
    return result.length ? result[0] : null;
  }
  
  // 通过上传图片ID查找对比记录
  static async findByUploadedImageId(uploadedImageId: string): Promise<Comparison[]> {
    return await query<Comparison[]>(
      `SELECT 
        id, 
        uploaded_image_id as uploadedImageId, 
        matched_model_id as matchedModelId, 
        similarity_score as similarityScore, 
        created_at as createdAt
       FROM comparisons
       WHERE uploaded_image_id = ?
       ORDER BY similarity_score DESC`,
      [uploadedImageId]
    );
  }
  
  // 通过匹配模型ID查找对比记录
  static async findByMatchedModelId(matchedModelId: string): Promise<Comparison[]> {
    return await query<Comparison[]>(
      `SELECT 
        id, 
        uploaded_image_id as uploadedImageId, 
        matched_model_id as matchedModelId, 
        similarity_score as similarityScore, 
        created_at as createdAt
       FROM comparisons
       WHERE matched_model_id = ?
       ORDER BY similarity_score DESC`,
      [matchedModelId]
    );
  }
  
  // 获取所有对比记录
  static async findAll(limit: number = 100, offset: number = 0): Promise<Comparison[]> {
    return await query<Comparison[]>(
      `SELECT 
        id, 
        uploaded_image_id as uploadedImageId, 
        matched_model_id as matchedModelId, 
        similarity_score as similarityScore, 
        created_at as createdAt
       FROM comparisons
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  }
  
  // 更新对比记录
  static async update(id: string, data: Partial<CreateComparisonData>): Promise<boolean> {
    const updateFields = [];
    const params = [];
    
    if (data.uploadedImageId !== undefined) {
      updateFields.push('uploaded_image_id = ?');
      params.push(data.uploadedImageId);
    }
    
    if (data.matchedModelId !== undefined) {
      updateFields.push('matched_model_id = ?');
      params.push(data.matchedModelId);
    }
    
    if (data.similarityScore !== undefined) {
      updateFields.push('similarity_score = ?');
      params.push(data.similarityScore);
    }
    
    if (updateFields.length === 0) {
      return false;
    }
    
    params.push(id);
    
    const result = await query(
      `UPDATE comparisons SET ${updateFields.join(', ')} WHERE id = ?`,
      params
    );
    
    return true;
  }
  
  // 删除对比记录
  static async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM comparisons WHERE id = ?',
      [id]
    );
    
    return true;
  }
} 