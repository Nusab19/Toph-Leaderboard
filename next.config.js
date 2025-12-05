/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    domains: [
      "assets.toph.co",
      "raw.githubusercontent.com",
      "nusab19.pages.dev",
    ],
  },
};

module.exports = nextConfig;
