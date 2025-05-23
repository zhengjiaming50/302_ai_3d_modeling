import mysql from 'mysql2/promise';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

// 只在服务器端运行
const isServer = typeof window === 'undefined';

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  multipleStatements: true // 允许执行多条SQL语句
};

// 读取SQL文件 - 只在服务器端执行
async function readSqlFile(filePath: string): Promise<string> {
  if (!isServer) return '';
  return fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
}

// 初始化数据库 - 只在服务器端执行
export async function initializeDatabase() {
  if (!isServer) return;
  
  let connection;
  
  try {
    // 创建数据库连接
    connection = await mysql.createConnection(dbConfig);
    // console.log('Connected to MySQL server.');
    
    // 读取SQL脚本文件
    const sqlScript = await readSqlFile('sql/schema.sql');
    
    // 执行SQL脚本
    await connection.query(sqlScript);
    // console.log('Database schema created successfully.');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    if (connection) await connection.end();
  }
}

// 辅助函数：生成UUID - 可在客户端和服务器端使用
export function generateId(): string {
  return uuidv4();
}

// 如果是服务器端且直接运行此脚本，执行初始化
if (isServer && require.main === module) {
  initializeDatabase()
    .then(() => {
      // console.log('Database initialization completed.');
      process.exit(0);
    })
    .catch(error => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
} 