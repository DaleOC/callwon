import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable strict mode for better debugging

  output: "standalone", // Use standalone output for deployment flexibility

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "callwon.com", // Allow images from your domain
      },
    ],
  },

  // Optional: Add an assetPrefix if your site is hosted on a CDN or custom domain
  assetPrefix: process.env.NODE_ENV === "production" ? "https://callwon.com" : undefined,
};

export default nextConfig;
