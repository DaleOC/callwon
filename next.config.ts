import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone", // Enables deployment as a standalone app

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "callwon.com", // Allow images from your domain
      },
    ],
  },

  // No assetPrefix for root domain
  assetPrefix: undefined,
};

export default nextConfig;
