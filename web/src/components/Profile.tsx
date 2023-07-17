import decode from "jwt-decode";
import { cookies } from "next/dist/client/components/headers";
import Image from "next/image";

interface User {
	name: string;
	sub: string;
	avatarUrl: string;
	username: string;
}

export function Profile() {
	const token = cookies().get("token")?.value;

	if (!token) {
		throw new Error("Unauthenticated");
	}

	const user: User = decode(token);

	return (
		<div className="flex items-start justify-between">
			<div>
				<Image
					src={user.avatarUrl}
					alt="Avatar"
					width={64}
					height={64}
					className="h-16 w-16 rounded-full"
				/>
			</div>

			<div className="ml-4 flex flex-col items-start justify-center">
				<h1 className="text-xl font-bold ">{user.name}</h1>
				<p className="text-sm font-medium ">@{user.username}</p>
				<a href="/api/auth/logout" className="mt-1 block text-red-400 hover:text-red-300 transition	">
					Sair
				</a>
			</div>
		</div>
	);
}
