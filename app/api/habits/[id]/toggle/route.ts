import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Buscar o hábito atual
    const habit = await prisma.habit.findUnique({
      where: { id },
    });

    if (!habit) {
      return NextResponse.json({ error: 'Habit not found' }, { status: 404 });
    }

    const newCompletedToday = !habit.completedToday;
    
    // Lógica simples de streak: se marcou hoje, aumenta 1. Se desmarcou, diminui 1.
    // Lógica mais robusta exigiria checar dias anteriores, mas para substituir o mock isso é o suficiente.
    let newStreak = habit.streak;
    if (newCompletedToday) {
      newStreak += 1;
    } else {
      newStreak = Math.max(0, newStreak - 1);
    }

    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: {
        completedToday: newCompletedToday,
        streak: newStreak,
      },
    });

    return NextResponse.json(updatedHabit);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to toggle habit' }, { status: 500 });
  }
}
