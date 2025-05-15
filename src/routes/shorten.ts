import z from "zod";
import { createShortUrl } from "../services/url.service";
import { FastifyTypeInstance } from "../types";

export async function ShortenRoute(app: FastifyTypeInstance) {
  app.post(
    "/shorten",
    {
      schema: {
        description: "Criar um novo link encurtado",
        tags: ["Link"],
        body: z.object({
          originalUrl: z.string().url(),
        }),
      },
    },
    async (request, reply) => {
      const { originalUrl } = request.body;
      const link = await createShortUrl(originalUrl);

      reply
        .status(201)
        .send({ shortUrl: `${process.env.SERVER_URL}/${link.code}` });
    }
  );
}
