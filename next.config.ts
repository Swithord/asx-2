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
  async redirects() {
    return [
      {
        source: '/restless',
        destination: 'https://www.eventbrite.com/e/the-restless-universe-cosmic-bursts-and-transients-asx-22nd-symposium-tickets-1982334742578?aff=oddtdtcreator',
        permanent: false,
      },
      {
        source: '/nominate',
        destination: 'https://forms.gle/s4ZnBeeBVNJfVcew8',
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
