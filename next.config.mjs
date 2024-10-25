/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'place.dog',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'robohash.org',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
