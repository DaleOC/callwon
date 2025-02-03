import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone", // Enables deployment as a standalone app
  
  // Add basePath if you're not serving from root
  basePath: "",
  
  // Add trailingSlash for consistency
  trailingSlash: true,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "callwon.com", // Allow images from your domain
      },
    ],
    unoptimized: true, // Add this for static exports
  },

  // Remove assetPrefix if you're serving from the root domain
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://callwon.com' : '',
};

export default nextConfig;
