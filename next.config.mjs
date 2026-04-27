/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Remove 'output: "export"' for Vercel deployment to enable API routes
  // Use 'output: "export"' only for GitHub Pages static deployment
};

export default nextConfig;
