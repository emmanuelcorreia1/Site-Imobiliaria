import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/construcao",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
