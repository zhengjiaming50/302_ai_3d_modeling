import { query, transaction } from '../lib/db';
import { generateId } from '../lib/db-init';

export interface Model {
  id: string;
  fileName: string;
  fileUrl: string;
  localFilePath?: string;
  format?: string;
  size?: number;
  parameters?: string;
  createdAt: Date;
  updatedAt: Date;
  imageId: string;
}

export interface CreateModelData {
  fileName: string;
  fileUrl: string;
  localFilePath?: string;
  format?: string;
  size?: number;
  parameters?: string;
  imageId: string;
}

export class ModelModel {
  // 创建模型记录
  static async create(data: CreateModelData): Promise<Model> {
    const id = generateId();
    const now = new Date();
    
    await query(
      `INSERT INTO models (id, file_name, file_url, local_file_path, format, size, parameters, image_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, data.fileName, data.fileUrl, data.localFilePath || null, data.format || null, data.size || null, data.parameters || null, data.imageId]
    );
    
    return {
      id,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      localFilePath: data.localFilePath,
      format: data.format,
      size: data.size,
      parameters: data.parameters,
      imageId: data.imageId,
      createdAt: now,
      updatedAt: now
    };
  }
  
  // 通过ID查找模型
  static async findById(id: string): Promise<Model | null> {
    const result = await query<Model[]>(
      `SELECT 
        id, 
        file_name as fileName, 
        file_url as fileUrl,
        local_file_path as localFilePath, 
        format,
        size, 
        parameters,
        created_at as createdAt, 
        updated_at as updatedAt,
        image_id as imageId
       FROM models
       WHERE id = ?`,
      [id]
    );
    
    return result.length ? result[0] : null;
  }
  
  // 通过图片ID查找模型
  static async findByImageId(imageId: string): Promise<Model | null> {
    const result = await query<Model[]>(
      `SELECT 
        id, 
        file_name as fileName, 
        file_url as fileUrl,
        local_file_path as localFilePath, 
        format,
        size, 
        parameters,
        created_at as createdAt, 
        updated_at as updatedAt,
        image_id as imageId
       FROM models
       WHERE image_id = ?`,
      [imageId]
    );
    
    return result.length ? result[0] : null;
  }
  
  // 获取所有模型列表
  static async findAll(limit: number = 100, offset: number = 0): Promise<Model[]> {
    return await query<Model[]>(
      `SELECT 
        id, 
        file_name as fileName, 
        file_url as fileUrl,
        local_file_path as localFilePath, 
        format,
        size, 
        parameters,
        created_at as createdAt, 
        updated_at as updatedAt,
        image_id as imageId
       FROM models
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  }
  
  // 更新模型信息
  static async update(id: string, data: Partial<CreateModelData>): Promise<boolean> {
    const updateFields = [];
    const params = [];
    
    if (data.fileName !== undefined) {
      updateFields.push('file_name = ?');
      params.push(data.fileName);
    }
    
    if (data.fileUrl !== undefined) {
      updateFields.push('file_url = ?');
      params.push(data.fileUrl);
    }
    
    if (data.localFilePath !== undefined) {
      updateFields.push('local_file_path = ?');
      params.push(data.localFilePath);
    }
    
    if (data.format !== undefined) {
      updateFields.push('format = ?');
      params.push(data.format);
    }
    
    if (data.size !== undefined) {
      updateFields.push('size = ?');
      params.push(data.size);
    }
    
    if (data.parameters !== undefined) {
      updateFields.push('parameters = ?');
      params.push(data.parameters);
    }
    
    if (data.imageId !== undefined) {
      updateFields.push('image_id = ?');
      params.push(data.imageId);
    }
    
    if (updateFields.length === 0) {
      return false;
    }
    
    params.push(id);
    
    const result = await query(
      `UPDATE models SET ${updateFields.join(', ')} WHERE id = ?`,
      params
    );
    
    return true;
  }
  
  // 删除模型
  static async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM models WHERE id = ?',
      [id]
    );
    
    return true;
  }
} 