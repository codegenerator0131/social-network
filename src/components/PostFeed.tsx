"use client";

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { databases, ID } from "../lib/appwrite";
import { Post } from "../types/appwrite";
import Comments from "./Comments";

interface PostFeedProps {
  initialPosts: Post[];
}

const PostFeed: React.FC<PostFeedProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const { user } = useAuth();

  const createPost = async () => {
    if (!user) return;

    try {
      const response = await databases.createDocument<Post>(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
        ID.unique(),
        {
          content: newPost,
          authorId: user.$id,
          authorName: user.name,
          likes: [],
          dislikes: [],
          createdAt: new Date().toISOString(),
        }
      );
      setPosts([response, ...posts]);
      setNewPost("");
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
        postId
      );
      setPosts(posts.filter((post) => post.$id !== postId));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const likePost = async (postId: string) => {
    if (!user) return;

    try {
      const post = posts.find((p) => p.$id === postId);
      if (post) {
        const likes = post.likes.includes(user.$id)
          ? post.likes.filter((id) => id !== user.$id)
          : [...post.likes, user.$id];
        const response = await databases.updateDocument<Post>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
          postId,
          { likes }
        );
        setPosts(posts.map((p) => (p.$id === postId ? response : p)));
      }
    } catch (error) {
      console.error("Failed to like post", error);
    }
  };

  const dislikePost = async (postId: string) => {
    if (!user) return;

    try {
      const post = posts.find((p) => p.$id === postId);
      if (post) {
        const dislikes = post.dislikes.includes(user.$id)
          ? post.dislikes.filter((id) => id !== user.$id)
          : [...post.dislikes, user.$id];
        const response = await databases.updateDocument<Post>(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
          postId,
          { dislikes }
        );
        setPosts(posts.map((p) => (p.$id === postId ? response : p)));
      }
    } catch (error) {
      console.error("Failed to dislike post", error);
    }
  };

  return (
    <div>
      {user && (
        <div className="mb-8">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={4}
            placeholder="What's on your mind?"
          ></textarea>
          <button
            onClick={createPost}
            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Post
          </button>
        </div>
      )}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.$id} className="bg-white p-4 rounded shadow">
            <p className="mb-2">{post.content}</p>
            <p className="text-sm text-gray-600">Posted by {post.authorName}</p>
            <div className="mt-2 flex items-center space-x-4">
              <button
                onClick={() => likePost(post.$id)}
                className="text-blue-500"
              >
                Like ({post.likes.length})
              </button>
              <button
                onClick={() => dislikePost(post.$id)}
                className="text-red-500"
              >
                Dislike ({post.dislikes.length})
              </button>
              {user && user.$id === post.authorId && (
                <button
                  onClick={() => deletePost(post.$id)}
                  className="text-gray-500"
                >
                  Delete
                </button>
              )}
            </div>
            <Comments postId={post.$id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostFeed;
