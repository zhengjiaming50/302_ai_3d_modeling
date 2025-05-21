import { query, transaction } from '../lib/db';
import { generateId } from '../lib/db-init';

export interface AITag {
  id: string;
  name: string;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAITagData {
  name: string;
  description?: string;
  category?: string;
}

export class AITagModel {
  // 创建标签记录
  static async create(data: CreateAITagData): Promise<AITag> {
    const id = generateId();
    const now = new Date();
    
    await query(
      `INSERT INTO ai_tags (id, name, description, category)
       VALUES (?, ?, ?, ?)`,
      [id, data.name, data.description || null, data.category || null]
    );
    
    return {
      id,
      name: data.name,
      description: data.description,
      category: data.category,
      createdAt: now,
      updatedAt: now
    };
  }
  
  // 通过ID查找标签
  static async findById(id: string): Promise<AITag | null> {
    const result = await query<AITag[]>(
      `SELECT 
        id, 
        name, 
        description, 
        category, 
        created_at as createdAt, 
        updated_at as updatedAt
       FROM ai_tags
       WHERE id = ?`,
      [id]
    );
    
    return result.length ? result[0] : null;
  }
  
  // 通过名称查找标签
  static async findByName(name: string): Promise<AITag | null> {
    const result = await query<AITag[]>(
      `SELECT 
        id, 
        name, 
        description, 
        category, 
        created_at as createdAt, 
        updated_at as updatedAt
       FROM ai_tags
       WHERE name = ?`,
      [name]
    );
    
    return result.length ? result[0] : null;
  }
  
  // 查找或创建标签
  static async findOrCreate(data: CreateAITagData): Promise<AITag> {
    const existingTag = await this.findByName(data.name);
    
    if (existingTag) {
      return existingTag;
    }
    
    return await this.create(data);
  }
  
  // 获取所有标签列表
  static async findAll(limit: number = 100, offset: number = 0): Promise<AITag[]> {
    return await query<AITag[]>(
      `SELECT 
        id, 
        name, 
        description, 
        category, 
        created_at as createdAt, 
        updated_at as updatedAt
       FROM ai_tags
       ORDER BY name ASC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  }
  
  // 获取图片相关的所有标签
  static async findByImageId(imageId: string): Promise<AITag[]> {
    return await query<AITag[]>(
      `SELECT 
        t.id, 
        t.name, 
        t.description, 
        t.category, 
        t.created_at as createdAt, 
        t.updated_at as updatedAt
       FROM ai_tags t
       JOIN ai_tag_images ti ON t.id = ti.tag_id
       WHERE ti.image_id = ?
       ORDER BY t.name ASC`,
      [imageId]
    );
  }
  
  // 更新标签信息
  static async update(id: string, data: Partial<CreateAITagData>): Promise<boolean> {
    const updateFields = [];
    const params = [];
    
    if (data.name !== undefined) {
      updateFields.push('name = ?');
      params.push(data.name);
    }
    
    if (data.description !== undefined) {
      updateFields.push('description = ?');
      params.push(data.description);
    }
    
    if (data.category !== undefined) {
      updateFields.push('category = ?');
      params.push(data.category);
    }
    
    if (updateFields.length === 0) {
      return false;
    }
    
    params.push(id);
    
    const result = await query(
      `UPDATE ai_tags SET ${updateFields.join(', ')} WHERE id = ?`,
      params
    );
    
    return true;
  }
  
  // 删除标签
  static async delete(id: string): Promise<boolean> {
    const result = await query(
      'DELETE FROM ai_tags WHERE id = ?',
      [id]
    );
    
    return true;
  }
} 