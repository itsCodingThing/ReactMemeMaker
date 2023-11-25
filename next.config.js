/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "picsum.photos",
            },
            {
                protocol: "https",
                hostname: "opengraph.githubassets.com",
            },
            {
                protocol: "https",
                hostname: "repository-images.githubusercontent.com",
            },
        ],
    },
};

module.exports = nextConfig;
