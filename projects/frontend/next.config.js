/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.watchOptions = {
      poll: 2000,
      aggregateTimeout: 300
    }
    return config
  }
}

module.exports = nextConfig
