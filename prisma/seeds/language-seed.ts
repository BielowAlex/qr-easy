import { languages } from '@/constants';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedName = 'Language Seed';

export async function seedLanguages() {
  try {
    const existingEvent = await prisma.event.findFirst({
      where: { name: seedName },
    });

    if (existingEvent) {
      console.log(`Seed "${seedName}" already executed.`);
      return;
    }

    for (const language of languages) {
      await prisma.language.upsert({
        where: { code: language.code },
        update: {},
        create: language,
      });
    }

    await prisma.event.create({
      data: {
        name: seedName,
        type: 'SEED_EVENT',
        description: 'Seed for populating world languages.',
      },
    });

    console.log(`Seed "${seedName}" executed successfully.`);
  } catch (error) {
    console.error(`Error executing seed "${seedName}":`, error);
  } finally {
    await prisma.$disconnect();
  }
}
