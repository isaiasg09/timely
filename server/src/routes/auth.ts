import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
	app.post("/register", async (request) => {
		// get access token from github with the client id and client secret
		const bodySchema = z.object({
			code: z.string()
		});

		const { code } = bodySchema.parse(request.body);

		const accessTokenResponse = await axios.post(
			"https://github.com/login/oauth/access_token",
			null,
			{
				params: {
					client_id: process.env.GITHUB_CLIENT_ID,
					client_secret: process.env.GITHUB_CLIENT_SECRET,
					code
				},
				headers: {
					Accept: "application/json"
				}
			}
		);

		const { access_token } = accessTokenResponse.data;

		// make new request to github with the access token to get the user data
		const userResponse = await axios.get("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${access_token}`
			}
		});

		// make user response validation with zod
		const userSchema = z.object({
			id: z.number(),
			login: z.string(),
			avatar_url: z.string().url(),
			name: z.string()
		});

		const userInfo = userSchema.parse(userResponse.data);

		// check if user already exists in the database
		let user = await prisma.user.findUnique({
			where: {
				githubId: userInfo.id
			}
		});

		// if user does not exist, create a new user in the database
		if (!user) {
			user = await prisma.user.create({
				data: {
					githubId: userInfo.id,
					login: userInfo.login,
					avatarUrl: userInfo.avatar_url,
					name: userInfo.name
				}
			});
		}

		const token = app.jwt.sign(
			{ name: user.name, avatarUrl: user.avatarUrl, username: user.login },
			{ expiresIn: "30 days", sub: user.id }
		);

		return { token };
	});
}
