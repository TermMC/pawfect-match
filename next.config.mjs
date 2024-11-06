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

            {
                protocol: 'https',
                hostname: 'avatar.iran.liara.run',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
