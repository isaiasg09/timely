import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// get code from query string
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");

	// send code to backend
	const registerResponse = await api.post("/register", {
		code
	});

	// get token from backend
	const { token } = registerResponse.data;

	// redirect to home page with token in cookie
	const redirectUrl = new URL("/", request.url);

	const cookieExpiresInSeconds = 60 * 60 * 24 * 30; // 1 month

	return NextResponse.redirect(redirectUrl, {
		headers: {
			"Set-Cookie": `token=${token}; Path=/; max-age=${cookieExpiresInSeconds};`
		}
	});
}
