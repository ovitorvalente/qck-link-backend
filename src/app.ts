import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { ShortenRoute } from "./routes/shorten";
import { RedirectRoute } from "./routes/redirect";

export const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*" });
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "QCK API",
      description: "API para encurtar e redirecionar links",
      version: "1.0.0",
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: "/dosc",
});

app.register(ShortenRoute);
app.register(RedirectRoute);
