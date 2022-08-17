/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "picsum.photos",
      "pbs.twimg.com",
      "images.unsplash.com",
      "breach-staging-assets.s3.us-east-2.amazonaws.com",
      "res-5.cloudinary.com",
      "s3-us-west-2.amazonaws.com",
      "res-3.cloudinary.com",
      "images.unsplash.com",
      "static.ghost.org",
      "s3-us-west-2.amazonaws.com",
    ],
  },
}

module.exports = nextConfig
