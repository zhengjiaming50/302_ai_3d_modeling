/**
 * 对比分析服务 - 前端API调用
 */

export interface CompareImageRequest {
  imageUrl: string;
  uploadedImageId?: string; // 可选，用于记录对比历史
}

export interface SimilarModel {
  id: string;
  fileName: string;
  fileUrl: string;
  localFilePath?: string;
  format?: string;
  createdAt: Date;
  originalImage: {
    id: string;
    fileName: string;
    fileUrl: string;
    localFilePath?: string;
  };
}

export interface ComparisonResult {
  confidence: number;
  reason: string;
  matchedImageId: string;
}

export interface CompareImageResponse {
  success: boolean;
  message: string;
  similarModel: SimilarModel | null;
  comparison?: ComparisonResult;
}

/**
 * 比较图片并找到最相似的3D模型
 */
export async function compareImage(request: CompareImageRequest): Promise<CompareImageResponse> {
  try {
    const response = await fetch('/api/compare', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error comparing image:', error);
    throw error;
  }
}

/**
 * 获取图片的AI标签
 */
export async function getImageAITags(imageId: string) {
  try {
    const response = await fetch(`/api/ai-tags?imageId=${encodeURIComponent(imageId)}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching AI tags:', error);
    throw error;
  }
}

/**
 * 手动触发图片AI标注
 */
export async function triggerImageAITagging(imageId: string, imageUrl: string) {
  try {
    const response = await fetch('/api/ai-tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageId,
        imageUrl
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error triggering AI tagging:', error);
    throw error;
  }
} 