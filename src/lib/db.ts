import mysql from 'mysql2/promise';
import { generateId } from './db-init';

// 判断是否是服务器端
const isServer = typeof window === 'undefined';

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || '3d_modeling_db'
};

// 创建连接池
let pool: mysql.Pool | null = null;

// 初始化连接池 - 只在服务器端执行
export function init() {
  if (!isServer) return;
  
  try {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    // console.log('MySQL connection pool created');
  } catch (error) {
    console.error('Error creating MySQL connection pool:', error);
    throw error;
  }
}

// 执行查询 - 只在服务器端执行
export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  if (!isServer) {
    throw new Error('Database queries can only be executed on the server');
  }
  
  if (!pool) init();
  
  try {
    const [rows] = await pool!.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}

// 执行事务 - 只在服务器端执行
export async function transaction<T>(callback: (connection: mysql.PoolConnection) => Promise<T>): Promise<T> {
  if (!isServer) {
    throw new Error('Database transactions can only be executed on the server');
  }
  
  if (!pool) init();
  
  const connection = await pool!.getConnection();
  await connection.beginTransaction();
  
  try {
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

// 只在服务器端初始化数据库连接
if (isServer) {
  init();
}

// 导出一个通用ID生成函数，可在客户端使用
export { generateId }; 