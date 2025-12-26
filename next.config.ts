// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 关键：导出为纯静态 HTML
};

export default nextConfig;
