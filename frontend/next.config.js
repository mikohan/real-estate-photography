/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: true,
  reactStrictMode: false,
  transpilePackages: ['countup.js', 'react-countup'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '*/**'
      }
    ]
  }
};

module.exports = nextConfig;
