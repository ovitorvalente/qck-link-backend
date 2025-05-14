import { PrismaClient } from "../generated/prisma";
import { GenerateCode } from "../utils/generateCode";

const prisma = new PrismaClient();

export async function createShortUrl(originalUrl: string, userId?: string) {
  const code = GenerateCode(6);
  const data = userId ? { code, originalUrl, userId } : { code, originalUrl };
  const link = await prisma.link.create({ data });
  return link;
}

export async function findOriginalUrl(code: string) {
  return prisma.link.findUnique({ where: { code } });
}
