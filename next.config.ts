import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '**.r2.dev', // Allow default R2 domains
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev', // Allow public R2 domains
      },
    ],
  },
};

export default nextConfig;
