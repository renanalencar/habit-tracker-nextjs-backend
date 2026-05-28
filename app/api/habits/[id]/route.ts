import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getUserFromRequest } from '@/lib/auth';

const prisma = new PrismaClient();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserFromRequest(request);
    const id = params.id;
    const body = await request.json();

    const existingHabit = await prisma.habit.findUnique({
      where: { id },
    });

    if (!existingHabit) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    // Verify ownership
    if (existingHabit.userId !== (userId || null)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        frequency: body.frequency,
        completedToday: body.completedToday,
        streak: body.streak,
      },
    });

    return NextResponse.json(updatedHabit);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update habit' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = getUserFromRequest(request);
    const id = params.id;

    const existingHabit = await prisma.habit.findUnique({
      where: { id },
    });

    if (!existingHabit) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    // Verify ownership
    if (existingHabit.userId !== (userId || null)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await prisma.habit.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete habit' }, { status: 500 });
  }
}
