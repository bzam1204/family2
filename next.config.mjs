/** @type {import('next').NextConfig} */
const nextConfig = {
  images : {
    remotePatterns : [
      {
        protocol : 'https',
        hostname : "picsum.photos",
        port : '',
        pathname : "/**",
      }, {
        protocol : 'https',
        hostname : "loremflickr.com",
        port : '',
        pathname : "/**",
      }, {
        protocol : 'https',
        hostname : "i0.wp.com",
        port : '',
        pathname : "/**",
      }
    ]
  }
};

export default nextConfig;
