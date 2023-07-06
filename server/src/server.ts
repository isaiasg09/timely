import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";

import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import fastifyJwt from "@fastify/jwt";

const app = fastify();

app.register(cors, { origin: true });
app.register(fastifyJwt, {
	secret:
		"spacetimeojsjsjsjjsjsjsjsjjjkjkcjnjnkjvhbhfbfhkvffffffffffffffffffhjsdfhdsjfghdsgfdhsghdhdhdhdhdhhdhddhdhdhhdhdhdhdhhdhdhdhdhdhhdhdhdfgvjdnfgvdhjnngvjhdbbh"
});
app.register(memoriesRoutes);
app.register(authRoutes);

const port = 3333;

app.listen({ port: port, host: "0.0.0.0" }).then(() => {
	console.log(`🚀 HTTP server is running on http://localhost:${port}`);
});
