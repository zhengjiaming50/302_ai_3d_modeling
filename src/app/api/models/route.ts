import { NextRequest, NextResponse } from 'next/server';
import { ModelModel, ImageModel } from '@/models';
import { saveFileFromUrl } from '@/lib/file-storage';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证必要字段
    if (!data.fileName || !data.fileUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: fileName, fileUrl' },
        { status: 400 }
      );
    }
    
    // 确保有imageId
    if (!data.imageId) {
      console.warn('Model created without associating to an image');
    }
    
    // 保存远程文件到本地
    let localFilePath: string | undefined = undefined;
    try {
      localFilePath = await saveFileFromUrl(data.fileUrl, data.fileName);
      console.log(`Model file saved locally: ${localFilePath}`);
    } catch (fileError) {
      console.error('Failed to save model file locally:', fileError);
      // 继续创建记录，但不包含本地文件路径
    }
    
    // 创建模型记录
    const model = await ModelModel.create({
      fileName: data.fileName,
      fileUrl: data.fileUrl,
      localFilePath, // 添加本地文件路径
      format: data.format || 'glb',
      size: data.size,
      parameters: data.parameters,
      imageId: data.imageId || ''
    });

    // 如果有关联图片，异步触发AI标注（确保图片有AI描述用于后续对比）
    if (data.imageId) {
      triggerImageAITagging(data.imageId).catch(error => {
        console.error('Background AI tagging for model image failed:', error);
        // 不影响主要响应
      });
    }
    
    return NextResponse.json({ 
      id: model.id, 
      localFilePath: model.localFilePath,
      success: true 
    });
  } catch (error) {
    console.error('Error saving model to database:', error);
    return NextResponse.json(
      { error: 'Failed to save model to database' },
      { status: 500 }
    );
  }
}

// 获取模型信息
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const imageId = searchParams.get('imageId');
    
    if (id) {
      // 获取特定模型
      const model = await ModelModel.findById(id);
      if (!model) {
        return NextResponse.json(
          { error: 'Model not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(model);
    } else if (imageId) {
      // 根据图片ID获取模型
      const model = await ModelModel.findByImageId(imageId);
      if (!model) {
        return NextResponse.json(
          { error: 'No model found for this image' },
          { status: 404 }
        );
      }
      return NextResponse.json(model);
    } else {
      // 获取所有模型列表
      const limit = parseInt(searchParams.get('limit') || '20');
      const offset = parseInt(searchParams.get('offset') || '0');
      const models = await ModelModel.findAll(limit, offset);
      return NextResponse.json(models);
    }
  } catch (error) {
    console.error('Error fetching model(s) from database:', error);
    return NextResponse.json(
      { error: 'Failed to fetch model data' },
      { status: 500 }
    );
  }
}

/**
 * 异步触发图片AI标注（后台处理）
 */
async function triggerImageAITagging(imageId: string) {
  try {
    console.log(`Triggering AI tagging for model image ${imageId}`);
    
    // 获取图片信息
    const image = await ImageModel.findById(imageId);
    if (!image) {
      console.warn(`Image ${imageId} not found for AI tagging`);
      return;
    }

    // 调用AI标注API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/ai-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageId: image.id,
        imageUrl: image.fileUrl
      })
    });

    if (!response.ok) {
      throw new Error(`AI tagging API returned ${response.status}: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`AI tagging completed for model image ${imageId}:`, result);

  } catch (error) {
    console.error(`Failed to trigger AI tagging for model image ${imageId}:`, error);
  }
} 