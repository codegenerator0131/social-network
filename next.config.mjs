/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
    NEXT_PUBLIC_APPWRITE_PROJECT_ID:
      process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
    NEXT_PUBLIC_APPWRITE_DATABASE_ID:
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID:
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID:
      process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID,
    NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID:
      process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID,
  },
};

module.exports = nextConfig;