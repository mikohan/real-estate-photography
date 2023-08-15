/** @type {import('next').NextConfig} */
const nextConfig = {
  // swcMinify: true,
  reactStrictMode: false,
  transpilePackages: ['countup.js', 'react-countup'],
  images: {
    domains: ['localhost', 'api.angaramedia.site']
  }
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //       port: '1337',
  //       pathname: '*/**'
  //     },
  //     {
  //       protocol: 'http',
  //       hostname: 'api.angaramedia.site',
  //       port: '80',
  //       pathname: '*/**'
  //     }
  //   ]
  // }
};

module.exports = nextConfig;
