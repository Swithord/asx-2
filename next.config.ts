import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['media.discordapp.net', 's3.amazonaws.com'],
  },
};

export default nextConfig;
