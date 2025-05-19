import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function ensurePageExists(page: string) {
  return prisma.analytics.upsert({
    where: { page },
    update: {},
    create: { page },
  });
}

export async function incrementVisit(page: string) {
  await ensurePageExists(page);
  return prisma.analytics.update({
    where: { page },
    data: {
      totalVisits: { increment: 1 },
    },
  });
}

export async function incrementConversion(page: string) {
  await ensurePageExists(page);
  return prisma.analytics.update({
    where: { page },
    data: {
      totalConversions: { increment: 1 },
    },
  });
}

export async function getAnalytics(page: string) {
  return prisma.analytics.findUnique({
    where: { page },
    select: {
      totalVisits: true,
      totalConversions: true,
    },
  });
}
