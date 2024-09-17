import { Client, Databases, Query } from "node-appwrite";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

const database = new Databases(client);

export const createUser = async (userId: string, data: any) => {
  try {
    await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      userId,
      data
    );
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUser = async (userId: string) => {
  try {
    return await database.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      userId
    );
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
};

export const updateUser = async (userId: string, data: any) => {
  try {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID!,
      userId,
      data
    );
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const createPost = async (data: any) => {
  try {
    return await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
      "unique()",
      data
    );
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    return await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!
    );
  } catch (error) {
    console.error("Error getting posts:", error);
    throw error;
  }
};

export const updatePost = async (postId: string, data: any) => {
  try {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
      postId,
      data
    );
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
};

export const deletePost = async (postId: string) => {
  try {
    await database.deleteDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID!,
      postId
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    throw error;
  }
};

export const createComment = async (data: any) => {
  try {
    return await database.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
      "unique()",
      data
    );
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const getComments = async (postId: string) => {
  try {
    const response = await database.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
      [Query.equal("postId", postId)]
    );
    return response.documents;
  } catch (error) {
    console.error("Error getting comments:", error);
    throw error;
  }
};
