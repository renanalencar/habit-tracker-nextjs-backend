import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const userId = getUserFromRequest(request);
    
    // If user is not authenticated, load seeded habits (userId = null)
    // If user is authenticated, load their specific habits
    const habits = await prisma.habit.findMany({
      where: {
        userId: userId || null,
      },
      orderBy: { createdAt: 'asc' },
    });
    
    return NextResponse.json(habits);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch habits' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = getUserFromRequest(request);
    const body = await request.json();
    
    if (!body.name || !body.frequency) {
      return NextResponse.json({ error: 'Name and frequency are required' }, { status: 400 });
    }

    const newHabit = await prisma.habit.create({
      data: {
        name: body.name,
        description: body.description || null,
        frequency: body.frequency,
        completedToday: false,
        streak: 0,
        userId: userId || null, // Anonymous habits get userId = null
      },
    });
    
    return NextResponse.json(newHabit, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create habit' }, { status: 500 });
  }
}
