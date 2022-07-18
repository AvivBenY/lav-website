/** @type {import('next').NextConfig} */
const { DB_PASS, DB_USER, DB_HOST, DB_NAME } = process.env
const nextConfig = {
  reactStrictMode: true,
  env: {
    DB_PASS, DB_USER, DB_HOST, DB_NAME
  },
  images: {
    domains: [
      'res.cloudinary.com'
    ],
  },
}

module.exports = nextConfig
