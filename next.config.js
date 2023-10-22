/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() { 
    return [
      {
        source: "/stacks/:path*",
        destination: "https://api.testnet.hiro.so/v2/:path*"
      }
    ]
  }
}

module.exports = nextConfig
