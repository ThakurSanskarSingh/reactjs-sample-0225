import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/db';
import { TaskStatus, Priority } from '@prisma/client';

// GET /api/tasks - Get all tasks
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    // Build the where clause for filtering
    const where: any = {};
  
    
    if (status && status !== 'all') {
      where.status = status.toUpperCase() as TaskStatus;
    }

    if (priority && priority !== 'all') {
      where.priority = priority.toUpperCase() as Priority;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { assignee: { name: { contains: search, mode: 'insensitive' } } }
      ];
    }

    const tasks = await prisma.task.findMany({
      where,
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

// POST /api/tasks - Create a new task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    // Create the task
    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        status: (body.status || 'TODO').toUpperCase() as TaskStatus,
        priority: (body.priority || 'MEDIUM').toUpperCase() as Priority,
        dueDate: body.dueDate ? new Date(body.dueDate) : null,
        creatorId: body.creatorId, // This should come from the authenticated user
        assigneeId: body.assigneeId || null,
        projectId: body.projectId || null
      },
      include: {
        assignee: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        creator: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Failed to create task' },
      { status: 500 }
    );
  }
}