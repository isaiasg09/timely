import { randomUUID } from "node:crypto";
import { extname, resolve } from "node:path";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

const pump = promisify(pipeline);

import { FastifyInstance } from "fastify";

export async function uploadRoutes(app: FastifyInstance) {
	app.post("/upload", async (request, reply) => {
		const upload = await request.file({ limits: { fileSize: 5_242_880 } }); // 5mb

		if (!upload) {
			return reply.status(400).send({ error: "No file provided" });
		}

		const mimeTypeRefex = /^(image|video)\/[a-zA-Z]+/;

		const isValidFileFormat = mimeTypeRefex.test(upload.mimetype);

		if (!isValidFileFormat) {
			return reply.status(400).send({ error: "Invalid file format" });
		}

		const fileId = randomUUID();
		const extension = extname(upload.filename);

		const fileName = fileId.concat(extension);

		const writeStream = createWriteStream(
			resolve(__dirname, "../../uploads/", fileName)
		);

		await pump(upload.file, writeStream);

		const fullUrl = `${request.protocol}://${request.hostname}`;
		const fileUrl = new URL(`/uploads/${fileName}`, fullUrl).toString();

		return reply.status(201).send({ fileUrl });
	});
}
