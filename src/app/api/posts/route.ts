import { NextResponse } from "next/server";
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} from "../../../lib/appwriteServer";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const post = await createPost(data);
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const posts = await getPosts();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to get posts" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const data = await request.json();
  try {
    await updatePost(data.$id, data);
    return NextResponse.json({ message: "Post updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  try {
    await deletePost(postId);
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
