import { createJiti } from "jiti";
import createNextIntlPlugin from "next-intl/plugin";
import { fileURLToPath } from "node:url";

const withNextIntl = createNextIntlPlugin();

// Validate env variables at build time
const jiti = createJiti(fileURLToPath(import.meta.url));
await jiti.import("./src/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable React strict mode
  reactStrictMode: false,
  // To enhance the experience with self-hosted(use Docker) services without Vercel
  // IMPORTANT: After enabling this option, users cannot build on Windows. To build on Windows, please use WSL2
  output: "standalone",
  experimental: {
    // Enable typed routes, see https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links
    typedRoutes: true,

  },
  images: {
    remotePatterns: [
      // 302 File Server
      {
        protocol: "https",
        hostname: "file.302.ai",
      },
      // Add more remote patterns here
      // ...
    ],
  },
  // 添加webpack配置，在客户端排除Node.js原生模块
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // 在客户端排除Node.js原生模块
      config.resolve.fallback = {
        fs: false,
        path: false,
        mysql: false,
        'mysql2/promise': false
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
