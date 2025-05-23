// 数据库初始化脚本
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import { fileURLToPath } from "url";

// 修复ES模块中的__dirname问题
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建存储目录 - 改为public目录
const publicDir = path.join(__dirname, "public");
const modelsDir = path.join(publicDir, "models");
const imagesDir = path.join(publicDir, "images");
const sqlFilePath = path.join(__dirname, "sql", "schema.sql");

// 确保目录存在
if (!fs.existsSync(modelsDir)) {
  fs.mkdirSync(modelsDir, { recursive: true });
  console.log("Created models directory:", modelsDir);
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
  console.log("Created images directory:", imagesDir);
}

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "13668903010a.",
  multipleStatements: true, // 允许执行多条SQL语句
};

// 初始化数据库
async function initializeDatabase() {
  let connection;

  try {
    // 创建数据库连接
    console.log("Connecting to MySQL...");
    connection = await mysql.createConnection(dbConfig);
    console.log("Connected to MySQL server.");

    // 读取SQL脚本文件
    console.log("Reading schema file:", sqlFilePath);
    const sqlScript = fs.readFileSync(sqlFilePath, "utf8");

    // 执行SQL脚本
    console.log("Executing SQL script...");
    await connection.query(sqlScript);
    console.log("Database schema created successfully.");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

// 开始初始化
async function init() {
  try {
    console.log("Initializing database...");
    await initializeDatabase();
    console.log("Database initialized successfully!");
    console.log("Storage directories created in public folder.");
    console.log("The application is now ready to use.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

init();
