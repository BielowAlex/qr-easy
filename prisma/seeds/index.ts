import { PrismaClient } from '@prisma/client';
import { seedLanguages } from './language-seed';

const prisma = new PrismaClient();

const main = async () => {
  await seedLanguages();
};
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
