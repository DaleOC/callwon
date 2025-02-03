import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: []
  },
  swcMinify: true,
};

export default nextConfig;
