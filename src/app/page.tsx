import React from "react";
import { databases } from "../lib/appwrite";
import { Post } from "../types/appwrite";
import PostFeed from "@/components/PostFeed";

async function getPosts(): Promise<Post[]> {
  try {
    const response = await databases.listDocuments<Post>(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!
    );
    return response.documents;
  } catch (error) {
    console.error("Failed to fetch posts", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Developer Posts</h1>
      <PostFeed initialPosts={posts} />
    </div>
  );
}
