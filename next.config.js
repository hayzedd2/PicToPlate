/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      HUGGING_FACE_BEARER_KEY: process.env.HUGGING_FACE_BEARER_KEY,
    },
  };
  
  module.exports = nextConfig;