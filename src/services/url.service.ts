import { PrismaClient } from "../generated/prisma";
import { GenerateCode } from "../utils/generateCode";

const prisma = new PrismaClient();

export async function createShortUrl(
  originalUrl: string,
  iv?: string,
  isEncrypted?: boolean,
  userId?: string
) {
  const code = GenerateCode(6);
  const data = userId
    ? { code, originalUrl, iv, userId, isEncrypted }
    : { code, originalUrl, iv, isEncrypted };

  const link = await prisma.link.create({ data });
  return link;
}

export async function findUrl(code: string) {
  return prisma.link.findUnique({ where: { code } });
}
