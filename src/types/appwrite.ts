import { Models } from "appwrite";

export interface AppwriteUser extends Models.User<Models.Preferences> {}

export interface Post extends Models.Document {
  content: string;
  authorId: string;
  authorName: string;
  likes: string[];
  dislikes: string[];
  createdAt: string;
}

export interface Comment extends Models.Document {
  content: string;
  authorId: string;
  authorName: string;
  postId: string;
  createdAt: string;
}

export interface Developer extends Models.Document {
  name: string;
  email: string;
  bio: string;
  education: string[];
  experience: string[];
  githubUsername: string;
}
