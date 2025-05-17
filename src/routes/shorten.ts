import z from "zod";
import { createShortUrl } from "../services/url.service";
import { FastifyTypeInstance } from "../types";
import { Encrypt } from "../services/encryption.service";

export async function ShortenRoute(app: FastifyTypeInstance) {
  app.post(
    "/shorten",
    {
      schema: {
        description: "Criar um novo link encurtado",
        tags: ["Link"],
        body: z.object({
          originalUrl: z.string().url(),
          isEncrypted: z.boolean(),
        }),
      },
    },
    async (request, reply) => {
      var { originalUrl, isEncrypted } = request.body;

      let storedUrl = originalUrl;
      let iv;

      if (isEncrypted) {
        const encrypted = Encrypt(originalUrl);
        storedUrl = encrypted.content;
        iv = encrypted.iv;
      }

      const link = await createShortUrl(storedUrl, iv, isEncrypted);

      reply
        .status(201)
        .send({ shortUrl: `${process.env.SERVER_URL}/${link.code}` });
    }
  );
}
