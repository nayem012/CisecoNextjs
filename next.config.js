/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.artexo.store",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image.artexobd.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
