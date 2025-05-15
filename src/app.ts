import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
  ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { ShortenRoute } from "./routes/shorten";
import { RedirectRoute } from "./routes/redirect";

export const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*" });
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "QCK API",
      description: "Documentação da API do encurtador de links",
      version: "1.0.0",
    },
    tags: [{ name: "Link", description: "Operações com links encurtados" }],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/dosc",
});

app.register(ShortenRoute);
app.register(RedirectRoute);
