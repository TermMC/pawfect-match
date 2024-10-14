/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'place.dog',
                port: '',
                pathname: '/**', 
            }
        ]
  }};

  export default nextConfig;
