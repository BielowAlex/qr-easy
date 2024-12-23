import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ua', name: 'Ukrainian', nativeName: 'Українська' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'sk', name: 'Slovak', nativeName: 'Slovenčina' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'bg', name: 'Bulgarian', nativeName: 'Български' },
  { code: 'sr', name: 'Serbian', nativeName: 'Српски' },
  { code: 'hr', name: 'Croatian', nativeName: 'Hrvatski' },
  { code: 'sl', name: 'Slovenian', nativeName: 'Slovenščina' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
  { code: 'lt', name: 'Lithuanian', nativeName: 'Lietuvių' },
  { code: 'et', name: 'Estonian', nativeName: 'Eesti' },
  { code: 'ga', name: 'Irish', nativeName: 'Gaeilge' },
  { code: 'is', name: 'Icelandic', nativeName: 'Íslenska' },
  { code: 'mt', name: 'Maltese', nativeName: 'Malti' },
  { code: 'mk', name: 'Macedonian', nativeName: 'Македонски' },
  { code: 'bs', name: 'Bosnian', nativeName: 'Bosanski' },
  { code: 'al', name: 'Albanian', nativeName: 'Shqip' },
];

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
