import { NextRequest, NextResponse } from 'next/server';
import { ModelModel } from '@/models';
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