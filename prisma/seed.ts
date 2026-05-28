import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOCK_HABITS = [
  {
    id: '1',
    name: 'Beber 2L de água',
    description: 'Manter a hidratação ao longo do dia',
    frequency: 'diário',
    completedToday: true,
    streak: 5,
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
  },
  {
    id: '2',
    name: 'Ler por 30 minutos',
    description: 'Leitura de livros técnicos ou ficção',
    frequency: 'diário',
    completedToday: false,
    streak: 3,
    createdAt: new Date('2026-01-05T00:00:00.000Z'),
  },
  {
    id: '3',
    name: 'Praticar exercícios',
    description: 'Caminhada, corrida ou academia',
    frequency: 'semanal',
    completedToday: false,
    streak: 2,
    createdAt: new Date('2026-01-10T00:00:00.000Z'),
  },
  {
    id: '4',
    name: 'Revisar metas do mês',
    description: 'Avaliar progresso e ajustar objetivos',
    frequency: 'mensal',
    completedToday: false,
    streak: 1,
    createdAt: new Date('2026-02-01T00:00:00.000Z'),
  },
  {
    id: '5',
    name: 'Meditar 10 minutos',
    description: 'Prática de mindfulness pela manhã',
    frequency: 'diário',
    completedToday: true,
    streak: 8,
    createdAt: new Date('2026-01-15T00:00:00.000Z'),
  },
];

async function main() {
  console.log('Start seeding...');
  for (const habit of MOCK_HABITS) {
    const created = await prisma.habit.upsert({
      where: { id: habit.id },
      update: {},
      create: habit,
    });
    console.log(`Created habit with id: ${created.id}`);
  }
  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
