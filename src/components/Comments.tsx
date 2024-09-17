"use client";

import React, { useState, useEffect } from "react";
import { databases, ID, Query } from "../lib/appwrite";
import { useAuth } from "../hooks/useAuth";
import { Comment } from "../types/appwrite";

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await databases.listDocuments<Comment>(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
        [Query.equal("postId", postId)]
      );
      setComments(response.documents);
    } catch (error) {
      console.error("Failed to fetch comments", error);
    }
  };

  const createComment = async () => {
    if (!user || !newComment.trim()) return;

    try {
      const response = await databases.createDocument<Comment>(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
        ID.unique(),
        {
          content: newComment,
          authorId: user.$id,
          authorName: user.name,
          postId: postId,
          createdAt: new Date().toISOString(),
        }
      );
      setComments([...comments, response]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to create comment", error);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="space-y-2">
        {comments.map((comment) => (
          <div key={comment.$id} className="bg-gray-100 p-2 rounded">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-600">By {comment.authorName}</p>
          </div>
        ))}
      </div>
      {user && (
        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={2}
            placeholder="Add a comment..."
          ></textarea>
          <button
            onClick={createComment}
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
          >
            Post Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default Comments;
