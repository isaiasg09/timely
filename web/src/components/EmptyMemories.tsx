import { cookies } from "next/headers";

export function EmptyMemories() {
	const isAuthenticated = cookies().has("token");
	const buttonHref = isAuthenticated
		? "/memories/new"
		: `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;

	return (
		<div className="flex flex-1 items-center justify-center">
			<p className="w-[360px] text-center leading-relaxed">
				Você ainda não registrou nenhuma lembrança, comece a{" "}
				<a
					href={buttonHref}
					className="underline transition-all hover:text-gray-50"
				>
					criar agora
				</a>
				!
			</p>
		</div>
	);
}
