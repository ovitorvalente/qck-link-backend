import { FastifyInstance } from "fastify";
import { findOriginalUrl } from "../services/url.service";

export async function RedirectRoute(app: FastifyInstance) {
  app.get("/:code", async (request, reply) => {
    const { code } = request.params as { code: string };
    const link = await findOriginalUrl(code);

    if (!link) {
      return reply.status(404).send({ error: `Link not found` });
    }

    reply.redirect(link.originalUrl);
  });
}
