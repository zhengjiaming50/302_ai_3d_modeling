import { createEnv } from "@t3-oss/env-nextjs";
import { ZodError, z } from "zod";

// Define and validate the environment variables
export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]), // Ensure NODE_ENV is either 'development' or 'production'
    DATABASE_URL: z.string().url(), // 数据库连接字符串
    SILICONFLOW_API_KEY: z.string().optional(), // SiliconFlow API密钥
  },
  client: {
    NEXT_PUBLIC_LOG_LEVEL: z.enum(["trace", "debug", "info", "warn", "error"]),
    NEXT_PUBLIC_302_WEBSITE_URL_GLOBAL: z.string(),
    NEXT_PUBLIC_302_WEBSITE_URL_CHINA: z.string(),
    NEXT_PUBLIC_302_API_KEY: z.string().optional(),
    NEXT_PUBLIC_API_URL: z.string(),
    NEXT_PUBLIC_AUTH_API_URL: z.string(),
    NEXT_PUBLIC_AUTH_PATH: z.string(),
    NEXT_PUBLIC_IS_CHINA: z.boolean(),
    NEXT_PUBLIC_DEFAULT_LOCALE: z.string(),
    NEXT_PUBLIC_DEFAULT_MODEL_NAME: z.string(),
    NEXT_PUBLIC_DEV_HOST_NAME: z.string().optional(),
    NEXT_PUBLIC_HIDE_BRAND: z.boolean().optional(),
    NEXT_PUBLIC_AI_302_API_UPLOAD_URL: z.string(),
    NEXT_PUBLIC_GITHUB_REPO_URL: z.string().optional(),
  },
  // Runtime environment configuration
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SILICONFLOW_API_KEY: process.env.SILICONFLOW_API_KEY,
    NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
    NEXT_PUBLIC_302_WEBSITE_URL_GLOBAL:
      process.env.NEXT_PUBLIC_302_WEBSITE_URL_GLOBAL,
    NEXT_PUBLIC_302_WEBSITE_URL_CHINA:
      process.env.NEXT_PUBLIC_302_WEBSITE_URL_CHINA,
    NEXT_PUBLIC_302_API_KEY: process.env.NEXT_PUBLIC_302_API_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL,
    NEXT_PUBLIC_AUTH_PATH: process.env.NEXT_PUBLIC_AUTH_PATH,
    NEXT_PUBLIC_IS_CHINA: process.env.NEXT_PUBLIC_IS_CHINA === "true",
    NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    NEXT_PUBLIC_DEFAULT_MODEL_NAME: process.env.NEXT_PUBLIC_DEFAULT_MODEL_NAME,
    NEXT_PUBLIC_DEV_HOST_NAME: process.env.NEXT_PUBLIC_DEV_HOST_NAME,
    NEXT_PUBLIC_HIDE_BRAND: process.env.NEXT_PUBLIC_HIDE_BRAND === "true",
    NEXT_PUBLIC_AI_302_API_UPLOAD_URL:
      process.env.NEXT_PUBLIC_AI_302_API_UPLOAD_URL,
    NEXT_PUBLIC_GITHUB_REPO_URL: process.env.NEXT_PUBLIC_GITHUB_REPO_URL,
  },
  // Handle validation errors
  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables:",
      error.flatten().fieldErrors
    );
    process.exit(1);
  },
  emptyStringAsUndefined: true, // Treat empty strings as undefined
});
