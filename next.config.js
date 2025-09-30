/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.zara.net",
      },
      {
        protocol: "https",
        hostname: "static.bershka.net",
      },
      {
        protocol: "https",
        hostname: "media.alshaya.com",
      },
    ],
  },
};

module.exports = nextConfig;
