/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      
      {
        protocol: 'https',
        hostname: 'hsrtiles.in',
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24 hours cache
  },
  reactStrictMode: true,
  compress: true,
  optimizeFonts: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: '/api/video',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, immutable' // 30 days cache for videos
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          }
        ]
      },
      {
        source: '/public/video/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable' // 1 year for public videos
          }
        ]
      },
      {
        source: '/public/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
}

export default nextConfig
