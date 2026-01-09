import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

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

export default withNextIntl(nextConfig);
