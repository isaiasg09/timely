import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
	// get all memories in ascending order
	app.get("/memories", async () => {
		const memories = await prisma.memory.findMany({
			orderBy: {
				createdAt: "asc"
			}
		});

		return memories.map((memory) => {
			return {
				id: memory.id,
				coverUrl: memory.coverUrl,
				excerpt: memory.content.substring(0, 115).concat("...")
			};
		});
	});

	// get memory by id
	app.get("/memories/:id", async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid()
		});

		const { id } = paramsSchema.parse(request.params);

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id: id
			}
		});

		return memory;
	});

	// create a new memory
	app.post("/memories", async (request) => {
		const bodySchema = z.object({
			content: z.string(),
			coverUrl: z.string(),
			isPublic: z.coerce.boolean().default(false)
		});

		const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

		const memory = await prisma.memory.create({
			data: {
				content: content,
				coverUrl: coverUrl,
				isPublic: isPublic,
				userId: "16dfd57a-6a8c-45cb-af73-c08ffbf0cc80"
			}
		});

		return memory;
	});

	// update memory by id
	app.put("/memories/:id", async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid()
		});
		const bodySchema = z.object({
			content: z.string(),
			coverUrl: z.string(),
			isPublic: z.coerce.boolean().default(false)
		});

		const { content, coverUrl, isPublic } = bodySchema.parse(request.body);
		const { id } = paramsSchema.parse(request.params);

		const memory = await prisma.memory.update({
			where: {
				id: id
			},
			data: {
				content: content,
				coverUrl: coverUrl,
				isPublic: isPublic
			}
		});

		return memory;
	});

	// delete memory by id
	app.delete("/memories/:id", async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid()
		});

		const { id } = paramsSchema.parse(request.params);

		await prisma.memory.delete({
			where: {
				id: id
			}
		});
	});
}
