// app/api/wallet/connect/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/db';
import { ethers } from 'ethers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletAddress, userId, signature, message } = body;

    if (!walletAddress || !userId) {
      return NextResponse.json(
        { error: 'Wallet address and user ID are required', success: false },
        { status: 400 }
      );
    }

    // Validate wallet address format
    if (!ethers.isAddress(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid wallet address format', success: false },
        { status: 400 }
      );
    }

    // Check if wallet is already connected to another user
    const existingWallet = await prisma.user.findUnique({
      where: { walletAddress }
    });

    if (existingWallet && existingWallet.id !== userId) {
      return NextResponse.json(
        { error: 'Wallet address is already connected to another user', success: false },
        { status: 400 }
      );
    }

    // Verify signature if provided
    if (signature && message) {
      try {
        const recoveredAddress = ethers.verifyMessage(message, signature);
        if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
          return NextResponse.json(
            { error: 'Invalid signature', success: false },
            { status: 400 }
          );
        }
      } catch (error) {
        return NextResponse.json(
          { error: 'Failed to verify signature', success: false },
          { status: 400 }
        );
      }
    }

    // Update user's wallet address
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { walletAddress },
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

    // Get wallet balance (optional)
    let balance = '0';
    try {
      const provider = new ethers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
      balance = ethers.formatEther(await provider.getBalance(walletAddress));
    } catch (error) {
      console.error('Failed to fetch wallet balance:', error);
    }

    const connectionData = {
      walletAddress,
      userId,
      connectedAt: new Date().toISOString(),
      network: process.env.ETHEREUM_NETWORK || 'ethereum',
      balance
    };

    return NextResponse.json({ 
      connection: connectionData,
      user: updatedUser,
      success: true,
      message: 'Wallet connected successfully'
    });
  } catch (error) {
    console.error('Error connecting wallet:', error);
    return NextResponse.json(
      { error: 'Failed to connect wallet', success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required', success: false },
        { status: 400 }
      );
    }

    // Update user to remove wallet address
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { walletAddress: null },
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

    return NextResponse.json({ 
      user: updatedUser,
      success: true,
      message: 'Wallet disconnected successfully'
    });
  } catch (error) {
    console.error('Error disconnecting wallet:', error);
    return NextResponse.json(
      { error: 'Failed to disconnect wallet', success: false },
      { status: 500 }
    );
  }
}