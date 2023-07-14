import { ReactNode } from "react";
import "./globals.css";
import { Roboto_Flex, Bai_Jamjuree as BaiJamjuree } from "next/font/google";
import { Copyright } from "@/components/Copyright";
import { Hero } from "@/components/Hero";
import { Profile } from "@/components/Profile";
import { SignIn } from "@/components/SignIn";
import { cookies } from "next/headers";

const baiJamjuree = BaiJamjuree({
	subsets: ["latin"],
	weight: "700",
	variable: "--font-bai-jamjuree"
});
const roboto = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto" });

export const metadata = {
	title: "timely",
	description: "A time capsule made with NextJs, TailwindCSS and TypeScript"
};

export default function RootLayout({ children }: { children: ReactNode }) {
	const isAuthenticated = cookies().has("token");
	return (
		<html lang="en">
			<body
				className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
			>
				<main className="grid min-h-screen grid-cols-2">
					{/* Left */}
					<div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars-l.svg)] bg-cover px-28 py-16">
						{/* Blur */}
						<div className="absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 rounded-full bg-purple-700 opacity-50 blur-full" />

						{/* Stripes */}
						<div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes" />

						{/* Sign In or Profile*/}

						{isAuthenticated ? <Profile /> : <SignIn />}

						{/* Hero */}
						<Hero />

						{/* Copyright */}
						<Copyright />
					</div>

					{/* Memories Page */}
					<div className="flex flex-col bg-[url(../assets/bg-stars-r.svg)] bg-cover p-16">
						{children}
					</div>
				</main>
			</body>
		</html>
	);
}
