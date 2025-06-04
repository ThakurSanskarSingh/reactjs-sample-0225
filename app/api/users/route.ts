import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/db';

// GET /api/users - Get all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        walletAddress: true,
        role: true,
        createdAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Check if email is unique if provided
    if (body.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email: body.email }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Email already in use' },
          { status: 400 }
        );
      }
    }

    // Check if wallet address is unique if provided
    if (body.walletAddress) {
      const existingUser = await prisma.user.findUnique({
        where: { walletAddress: body.walletAddress }
      });

      if (existingUser) {
        return NextResponse.json(
          { error: 'Wallet address already in use' },
          { status: 400 }
        );
      }
    }

    // Create the user
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        avatar: body.avatar,
        walletAddress: body.walletAddress,
        role: body.role || 'MEMBER'
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        walletAddress: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}