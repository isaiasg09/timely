import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	// Set redirect to home after logout 
	const redirectUrl = new URL("/", request.url);

	// clear the cookie
	return NextResponse.redirect(redirectUrl, {
		headers: {
			"Set-Cookie": `token=; Path=/; max-age=0;`
		}
	});
}
