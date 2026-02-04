import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Set basePath if deploying to a subdirectory (e.g., GitHub Pages)
  // Leave empty or undefined for root domain deployment
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
