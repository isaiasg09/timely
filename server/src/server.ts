import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient();

app.listen({ port: 3000 }).then(() => {
	console.log("🚀 HTTP server is running on http://localhost:3000");
});

app.get("/users", async () => {
	const users = await prisma.user.findMany();

	return users;
});
