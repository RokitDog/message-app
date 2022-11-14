/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['1000logos.net', 'platform-lookaside.fbsbx.com', 'static.xx.fbcdn.net']
  },
  typescript: {
    ignoreBuildErrors: true,
  }
}
