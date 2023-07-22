import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import multipart from "@fastify/multipart";

import { memoriesRoutes } from "./routes/memories";
import { authRoutes } from "./routes/auth";
import { uploadRoutes } from "./routes/upload";
import { resolve } from "node:path";

const app = fastify();

app.register(cors, { origin: true });
app.register(fastifyJwt, {
	secret:
		"spacetimeojsjsjsjjsjsjsjsjjjkjkcjnjnkjvhbhfbfhkvffffffffffffffffffhjsdfhdsjfghdsgfdhsghdhdhdhdhdhhdhddhdhdhhdhdhdhdhhdhdhdhdhdhhdhdhdfgvjdnfgvdhjnngvjhdbbh"
});
app.register(multipart);
app.register(require("@fastify/static"), {
	root: resolve(__dirname, "../uploads"),
	prefix: "/uploads/"
});

app.register(authRoutes);
app.register(uploadRoutes);
app.register(memoriesRoutes);

const port = 3333;

app.listen({ port: port, host: "0.0.0.0" }).then(() => {
	console.log(`🚀 HTTP server is running on http://localhost:${port}`);
});
