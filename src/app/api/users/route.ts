import { NextResponse } from 'next/server';
import { createUser, getUser, updateUser } from '../../../lib/appwriteServer';

export async function POST(request: Request) {
  const data = await request.json();
  try {
    await createUser(data.userId, data);
    return NextResponse.json({ message: 'User created successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }
  try {
    const user = await getUser(userId);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const data = await request.json();
  try {
    await updateUser(data.userId, data);
    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}