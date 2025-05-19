import { FastifyInstance } from "fastify";
import { findUrl } from "../services/url.service";
import { Decrypt } from "../services/encryption.service";

export async function RedirectRoute(app: FastifyInstance) {
  app.get(
    "/:code",
    {
      schema: {
        description: "Redireciona o código encurtado para a URL original",
        tags: ["Link"],
      },
    },
    async (request, reply) => { 
      const { code } = request.params as {
        code: string;
      };
      const link = await findUrl(code);

      if (!link) {
        return reply.status(404).send({ error: `Link not found` });
      }

      let originalUrl = link.originalUrl;

      if (link.isEncrypted && link.iv) {
        originalUrl = Decrypt({ content: link.originalUrl, iv: link.iv });
      }

      reply.redirect(originalUrl);
    }
  );
}
