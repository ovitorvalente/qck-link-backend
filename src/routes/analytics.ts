import { request } from "http";
import { app } from "../app";
import {
  getAnalytics,
  incrementConversion,
  incrementVisit,
} from "../services/analytics.service";
import { FastifyTypeInstance } from "../types";

export async function analyticsRoutes(app: FastifyTypeInstance) {
  app.post("/api/visit", async (request, reply) => {
    await incrementVisit("/");
    reply.code(204).send();
  });

  app.get("/api/analytics", async (request, reply) => {
    const data = await getAnalytics("/");
    reply.send(data);
  });
}