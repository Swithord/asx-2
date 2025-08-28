import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.discordapp.net',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'asx-news-images.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
