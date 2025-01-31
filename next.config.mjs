import withPWA from 'next-pwa'

const pwaConfig = withPWA( {
  dest : 'public',
  register : true,
  skipWaiting : true,
} )

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

export default pwaConfig( nextConfig );
