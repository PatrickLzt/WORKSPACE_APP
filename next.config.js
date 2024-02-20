/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        DATABASE_URL: process.env.DATABASE_URL,
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [{
            hostname: 'chooadmotzlwcvkcyzzj.supabase.co'
        }],
    },
}

module.exports = nextConfig
