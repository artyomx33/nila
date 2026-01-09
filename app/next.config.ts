import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Turbopack for faster development
  experimental: {
    // Add any experimental features here
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Add remote image patterns if needed
    ],
  },
};

export default nextConfig;
