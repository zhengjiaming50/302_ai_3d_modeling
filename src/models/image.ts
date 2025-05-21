import { query } from "../lib/db";
import { generateId } from "../lib/db-init";

export interface Image {
  id: string;
  fileName: string;
  fileUrl: string;
  localFilePath?: string;
  mimeType: string;
  size?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateImageData {
  fileName: string;
  fileUrl: string;
  localFilePath?: string;
  mimeType: string;
  size?: number;
}

export class ImageModel {
  // 创建图片记录
  static async create(data: CreateImageData): Promise<Image> {
    const id = generateId();
    const now = new Date();

    await query(
      `INSERT INTO images (id, file_name, file_url, local_file_path, mime_type, size)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.fileName,
        data.fileUrl,
        data.localFilePath || null,
        data.mimeType,
        data.size || null,
      ]
    );

    return {
      id,
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      localFilePath: data.localFilePath,
      mimeType: data.mimeType,
      size: data.size,
      createdAt: now,
      updatedAt: now,
    };
  }

  // 通过ID查找图片
  static async findById(id: string): Promise<Image | null> {
    const result = await query<Image[]>(
      `SELECT 
        id, 
        file_name as fileName, 
        file_url as fileUrl,
        local_file_path as localFilePath, 
        mime_type as mimeType, 
        size, 
        created_at as createdAt, 
        updated_at as updatedAt
       FROM images
       WHERE id = ?`,
      [id]
    );

    return result.length ? result[0] : null;
  }

  // 获取所有图片列表
  static async findAll(
    limit: number = 100,
    offset: number = 0
  ): Promise<Image[]> {
    return await query<Image[]>(
      `SELECT 
        id, 
        file_name as fileName, 
        file_url as fileUrl,
        local_file_path as localFilePath, 
        mime_type as mimeType, 
        size, 
        created_at as createdAt, 
        updated_at as updatedAt
       FROM images
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
  }

  // 更新图片信息
  static async update(
    id: string,
    data: Partial<CreateImageData>
  ): Promise<boolean> {
    const updateFields = [];
    const params = [];

    if (data.fileName !== undefined) {
      updateFields.push("file_name = ?");
      params.push(data.fileName);
    }

    if (data.fileUrl !== undefined) {
      updateFields.push("file_url = ?");
      params.push(data.fileUrl);
    }

    if (data.localFilePath !== undefined) {
      updateFields.push("local_file_path = ?");
      params.push(data.localFilePath);
    }

    if (data.mimeType !== undefined) {
      updateFields.push("mime_type = ?");
      params.push(data.mimeType);
    }

    if (data.size !== undefined) {
      updateFields.push("size = ?");
      params.push(data.size);
    }

    if (updateFields.length === 0) {
      return false;
    }

    params.push(id);

    await query(
      `UPDATE images SET ${updateFields.join(", ")} WHERE id = ?`,
      params
    );

    return true;
  }

  // 删除图片
  static async delete(id: string): Promise<boolean> {
    await query("DELETE FROM images WHERE id = ?", [id]);

    return true;
  }
}
