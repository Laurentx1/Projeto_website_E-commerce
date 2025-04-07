/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable proper TypeScript and ESLint checking
  typescript: {
    // Don't ignore TypeScript errors during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Don't ignore ESLint errors during build
    ignoreDuringBuilds: false,
  },
}

export default nextConfig

