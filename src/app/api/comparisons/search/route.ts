import { NextRequest, NextResponse } from "next/server";
import { ImageModel, ModelModel, AITagImageModel, ComparisonModel } from "@/models";
import { analyzeImageWithSiliconFlow } from "@/services/siliconflow-vision";
import { query } from "@/lib/db";

interface SimilarModel {
  id: string;
  imageId: string;
  fileName: string;
  fileUrl: string;
  localFilePath?: string;
  similarityScore: number;
  originalImage: {
    id: string;
    fileName: string;
    fileUrl: string;
    localFilePath?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // 验证必要字段
    if (!data.imageId || !data.imageUrl) {
      return NextResponse.json(
        { error: "Missing required fields: imageId, imageUrl" },
        { status: 400 }
      );
    }

    const { imageId, imageUrl } = data;

    // 1. 使用SiliconFlow分析上传的图片
    // console.log("分析上传的图片...");
    let uploadedImageDescription: string;
    
    try {
      const analysisResult = await analyzeImageWithSiliconFlow(imageUrl);
      uploadedImageDescription = analysisResult.description;
      // console.log("图片分析完成:", uploadedImageDescription);
    } catch (error) {
      console.error("图片分析失败:", error);
      return NextResponse.json(
        { error: "图片分析失败" },
        { status: 500 }
      );
    }

    // 2. 获取数据库中所有图片的ID和描述信息
    // console.log("获取数据库中的图片信息...");
    
    const existingImages = await query<Array<{
      imageId: string;
      fileName: string;
      fileUrl: string;
      localFilePath?: string;
      description: string;
    }>>(
      `SELECT 
        i.id as imageId,
        i.file_name as fileName,
        i.file_url as fileUrl,
        i.local_file_path as localFilePath,
        GROUP_CONCAT(at.name SEPARATOR ' ') as description
       FROM images i
       LEFT JOIN ai_tag_images ati ON i.id = ati.image_id
       LEFT JOIN ai_tags at ON ati.tag_id = at.id
       WHERE i.id != ?
       GROUP BY i.id, i.file_name, i.file_url, i.local_file_path
       HAVING description IS NOT NULL`,
      [imageId]
    );

    // console.log(`找到 ${existingImages.length} 张已标注的图片`);

    if (existingImages.length === 0) {
      return NextResponse.json({
        similarModels: [],
        message: "数据库中没有找到已标注的图片"
      });
    }

    // 3. 构建相似度分析的提示词
    const comparisonPrompt = `请作为一个专业的人像相似度分析专家，分析以下上传图片与数据库中现有图片的相似度。

**上传图片的特征描述：**
${uploadedImageDescription}

**数据库中的图片信息：**
${existingImages.map((img, index) => `${index + 1}. ID: ${img.imageId}, 描述: ${img.description}`).join('\n')}

请按照以下格式严格输出相似度分析结果，每行一个图片ID和相似度分数（0-100）：

格式：图片ID:相似度分数
示例：abc123:85

要求：
1. 只输出图片ID和分数，用冒号分隔
2. 每行一个结果
3. 相似度分数必须是0-100之间的整数
4. 按相似度从高到低排序
5. 只返回相似度大于30的结果
6. 不要输出任何其他解释文字

分析结果：`;

    // 4. 调用SiliconFlow进行相似度分析
    // console.log("进行相似度分析...");
    
    let similarityResults: Array<{ imageId: string; score: number }> = [];
    
    try {
      const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.SILICONFLOW_API_KEY}`,
        },
        body: JSON.stringify({
          model: "Qwen/Qwen2-VL-72B-Instruct",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: imageUrl,
                    detail: "high",
                  },
                },
                {
                  type: "text",
                  text: comparisonPrompt,
                },
              ],
            },
          ],
          temperature: 0.3,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`SiliconFlow API error: ${response.status}`);
      }

      const aiResponse = await response.json();
      const analysisText = aiResponse.choices[0]?.message?.content || "";
      
      // console.log("AI分析结果:", analysisText);
      
      // 解析AI返回的结果
      const lines = analysisText.trim().split('\n');
      for (const line of lines) {
        const match = line.match(/^([a-zA-Z0-9-_]+):(\d+)$/);
        if (match) {
          const [, imageId, scoreStr] = match;
          const score = parseInt(scoreStr, 10);
          if (score >= 30 && score <= 100) {
            similarityResults.push({ imageId, score });
          }
        }
      }

      // 按相似度排序
      similarityResults.sort((a, b) => b.score - a.score);
      
      // console.log("解析的相似度结果:", similarityResults);
      
    } catch (error) {
      console.error("相似度分析失败:", error);
      // 如果AI分析失败，使用基本的文本匹配作为备选方案
      // console.log("使用备选方案进行相似度计算...");
      
      for (const img of existingImages) {
        const score = calculateBasicSimilarity(uploadedImageDescription, img.description);
        if (score >= 30) {
          similarityResults.push({ imageId: img.imageId, score });
        }
      }
      
      similarityResults.sort((a, b) => b.score - a.score);
    }

    // 5. 获取相似图片对应的3D模型
    const similarModels: SimilarModel[] = [];
    
    for (const result of similarityResults.slice(0, 10)) { // 最多返回10个结果
      try {
        // 获取模型信息
        const model = await ModelModel.findByImageId(result.imageId);
        if (!model) {
          // console.log(`图片 ${result.imageId} 没有对应的3D模型`);
          continue;
        }

        // 获取原始图片信息
        const originalImage = await ImageModel.findById(result.imageId);
        if (!originalImage) {
          // console.log(`找不到图片 ${result.imageId}`);
          continue;
        }

        similarModels.push({
          id: model.id,
          imageId: result.imageId,
          fileName: model.fileName,
          fileUrl: model.fileUrl,
          localFilePath: model.localFilePath,
          similarityScore: result.score,
          originalImage: {
            id: originalImage.id,
            fileName: originalImage.fileName,
            fileUrl: originalImage.fileUrl,
            localFilePath: originalImage.localFilePath,
          },
        });

        // 保存对比记录
        try {
          await ComparisonModel.create({
            uploadedImageId: imageId,
            matchedModelId: model.id,
            similarityScore: result.score,
          });
        } catch (comparisonError) {
          console.error("保存对比记录失败:", comparisonError);
        }
        
      } catch (error) {
        console.error(`处理模型 ${result.imageId} 时出错:`, error);
        continue;
      }
    }

    // console.log(`找到 ${similarModels.length} 个相似模型`);

    return NextResponse.json({
      similarModels,
      totalMatches: similarityResults.length,
      uploadedImageDescription,
    });

  } catch (error) {
    console.error("搜索相似模型时出错:", error);
    return NextResponse.json(
      { error: "搜索失败" },
      { status: 500 }
    );
  }
}

// 备选方案：基本的文本相似度计算
function calculateBasicSimilarity(text1: string, text2: string): number {
  const words1 = text1.toLowerCase().split(/\s+/);
  const words2 = text2.toLowerCase().split(/\s+/);
  
  const commonWords = words1.filter(word => words2.includes(word));
  const totalWords = Math.max(words1.length, words2.length);
  
  return Math.round((commonWords.length / totalWords) * 100);
} 