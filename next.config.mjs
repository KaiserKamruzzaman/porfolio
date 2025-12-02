/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Remove 'output: "export"' for Vercel deployment to enable API routes
  // Use 'output: "export"' only for GitHub Pages static deployment
};

export default nextConfig;
