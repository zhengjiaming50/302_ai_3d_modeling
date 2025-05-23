import fs from "fs";
import path from "path";
import { Buffer } from "buffer";

// 确保只在服务器端运行
const isServer = typeof window === "undefined";

// 创建存储目录路径 - 从storage改为public目录
const STORAGE_DIR = path.join(process.cwd(), "public");
const MODELS_DIR = path.join(STORAGE_DIR, "models");
const IMAGES_DIR = path.join(STORAGE_DIR, "images");

/**
 * 确保存储目录存在
 */
export function ensureDirectoriesExist(): void {
  if (!isServer) return;

  if (!fs.existsSync(MODELS_DIR)) {
    fs.mkdirSync(MODELS_DIR, { recursive: true });
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
  }
}

/**
 * 从URL保存文件到本地存储
 * @param url 文件URL
 * @param fileName 保存的文件名
 * @param fileType 文件类型 'model' 或 'image'
 * @returns 本地文件路径
 */
export async function saveFileFromUrl(
  url: string,
  fileName: string,
  fileType: "model" | "image" = "model"
): Promise<string> {
  if (!isServer)
    throw new Error("File operations can only be performed on the server");

  // 确保目录存在
  ensureDirectoriesExist();

  // 根据文件类型选择目录
  const targetDir = fileType === "model" ? MODELS_DIR : IMAGES_DIR;

  // 创建文件路径
  const filePath = path.join(targetDir, fileName);

  try {
    // 获取文件内容
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch file from URL: ${url}`);
    }

    // 将响应转为buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 写入文件
    fs.writeFileSync(filePath, buffer);

    // 返回相对于项目根目录的路径
    return path.relative(process.cwd(), filePath).replace(/\\/g, "/");
  } catch (error) {
    console.error("Error saving file from URL:", error);
    throw error;
  }
}

/**
 * 从Blob保存文件到本地存储
 * @param blob 文件Blob对象
 * @param fileName 保存的文件名
 * @param fileType 文件类型 'model' 或 'image'
 * @returns 本地文件路径
 */
export async function saveFileFromBlob(
  blob: Blob,
  fileName: string,
  fileType: "model" | "image" = "model"
): Promise<string> {
  if (!isServer)
    throw new Error("File operations can only be performed on the server");

  // 确保目录存在
  ensureDirectoriesExist();

  // 根据文件类型选择目录
  const targetDir = fileType === "model" ? MODELS_DIR : IMAGES_DIR;

  // 创建文件路径
  const filePath = path.join(targetDir, fileName);

  try {
    // 将blob转换为buffer
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 写入文件
    fs.writeFileSync(filePath, buffer);

    // 返回相对于项目根目录的路径
    return path.relative(process.cwd(), filePath).replace(/\\/g, "/");
  } catch (error) {
    console.error("Error saving file from blob:", error);
    throw error;
  }
}

// 初始化存储目录
if (isServer) {
  ensureDirectoriesExist();
}
