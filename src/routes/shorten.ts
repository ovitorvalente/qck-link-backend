import { FastifyInstance } from "fastify";
import { createShortUrl } from "../services/url.service";

export async function ShortenRoute(app: FastifyInstance) {
  app.post("/shorten", async (request, reply) => {
    const { originalUrl } = request.body as { originalUrl: string };
    const link = await createShortUrl(originalUrl);

    reply.send({ shortUrl: `${process.env.SERVER_URL}/${link.code}` });
  });
}
