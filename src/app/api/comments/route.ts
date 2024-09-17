import { NextResponse } from "next/server";
import { createComment, getComments } from "../../../lib/appwriteServer";

export async function POST(request: Request) {
  const data = await request.json();
  try {
    const comment = await createComment(data);
    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");
  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  try {
    const comments = await getComments(postId);
    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get comments" },
      { status: 500 }
    );
  }
}
