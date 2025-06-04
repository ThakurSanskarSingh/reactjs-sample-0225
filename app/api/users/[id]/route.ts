// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { Role } from '@prisma/client';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        walletAddress: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    return NextResponse.json({ user, success: true });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user', success: false },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Check email uniqueness if being updated
    if (body.email && body.email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email: body.email }
      });

      if (emailExists) {
        return NextResponse.json(
          { error: 'Email already in use', success: false },
          { status: 400 }
        );
      }
    }

    // Check wallet address uniqueness if being updated
    if (body.walletAddress && body.walletAddress !== existingUser.walletAddress) {
      const walletExists = await prisma.user.findUnique({
        where: { walletAddress: body.walletAddress }
      });

      if (walletExists) {
        return NextResponse.json(
          { error: 'Wallet address already in use', success: false },
          { status: 400 }
        );
      }
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        email: body.email,
        avatar: body.avatar,
        walletAddress: body.walletAddress,
        role: body.role ? (body.role.toUpperCase() as Role) : undefined
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        walletAddress: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ user: updatedUser, success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user', success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });
    
    if (!existingUser) {
      return NextResponse.json(
        { error: 'User not found', success: false },
        { status: 404 }
      );
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        walletAddress: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json({ user: deletedUser, success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user', success: false },
      { status: 500 }
    );
  }
}