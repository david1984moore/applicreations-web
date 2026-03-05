import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Required for @react-pdf/renderer server-side PDF generation
  serverExternalPackages: ['@react-pdf/renderer'],
};

export default nextConfig;
