/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ["res.cloudinary.com"],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Compress responses
  compress: true,
  // Optimize fonts
  optimizeFonts: true,
  // Enable SWC minification
  swcMinify: true,
}

export default nextConfig
