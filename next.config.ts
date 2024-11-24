import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

export default nextConfig;
