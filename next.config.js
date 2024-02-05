/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "webcdn.hirezstudios.com"
            }
        ]
    }
}

module.exports = nextConfig
