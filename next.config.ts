import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // SANITY CMS PAUSED: restore this remote pattern if Sanity-hosted images return.
      // {
      //   protocol: 'https',
      //   hostname: 'cdn.sanity.io',
      // },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
