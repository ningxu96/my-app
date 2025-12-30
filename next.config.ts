import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 开发阶段先不要 basePath / assetPrefix，避免 404
  output: "export",
};

export default nextConfig;