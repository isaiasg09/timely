import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
	// verify if the user is authenticated before executing the route handler
	app.addHook("preHandler", async (request) => {
		await request.jwtVerify();
	});

	// get all memories in ascending order
	app.get("/memories", async (request) => {
		const memories = await prisma.memory.findMany({
			where: {
				userId: request.user.sub
			},
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
	app.get("/memories/:id", async (request, response) => {
		const paramsSchema = z.object({
			id: z.string().uuid()
		});

		const { id } = paramsSchema.parse(request.params);

		const memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id: id
			}
		});

		// verify if the user id of the memory is the same as the user that is trying to access the memory and if the memory is public
		if (!memory.isPublic && memory.userId !== request.user.sub) {
			return response.status(401).send();
		}

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
				userId: request.user.sub
			}
		});

		return memory;
	});

	// update memory by id
	app.put("/memories/:id", async (request, response) => {
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

		let memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id
			}
		});

		// verify if the user id of the memory is the same as the user that is trying to update the memory
		if (memory.userId !== request.user.sub) {
			return response.status(401).send();
		}

		memory = await prisma.memory.update({
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
	app.delete("/memories/:id", async (request, response) => {
		const paramsSchema = z.object({
			id: z.string().uuid()
		});

		const { id } = paramsSchema.parse(request.params);

		let memory = await prisma.memory.findUniqueOrThrow({
			where: {
				id
			}
		});

		// verify if the user id of the memory is the same as the user that is trying to update the memory
		if (memory.userId !== request.user.sub) {
			return response.status(401).send();
		}

		await prisma.memory.delete({
			where: {
				id: id
			}
		});
	});
}
