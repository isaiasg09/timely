import { ReactNode } from "react";
import "./globals.css";
import { Roboto_Flex, Bai_Jamjuree as BaiJamjuree } from "next/font/google";

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
	return (
		<html lang="en">
			<body
				className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
			>
				{children}
			</body>
		</html>
	);
}
