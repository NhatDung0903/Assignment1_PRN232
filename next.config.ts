import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "image.celine.com",
      },
      {
        protocol: "https",
        hostname: "**.celine.com",
      },
      {
        protocol: "https",
        hostname: "cdn-images.farfetch-contents.com",
      },
      {
        protocol: "https",
        hostname: "**.farfetch-contents.com",
      },
      {
        protocol: "https",
        hostname: "www.mytheresa.com",
      },
      {
        protocol: "https",
        hostname: "**.mytheresa.com",
      },
      {
        protocol: "https",
        hostname: "classicfella.com",
      },
      {
        protocol: "https",
        hostname: "**.classicfella.com",
      },
      {
        protocol: "https",
        hostname: "product.hstatic.net",
      },
      {
        protocol: "https",
        hostname: "**.hstatic.net",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "**.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
