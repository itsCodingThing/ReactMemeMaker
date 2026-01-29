import "@/styles/tailwind.css";
import "@/styles/app.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
	title: "Make-a-Meme",
	description: "Create memes with custom text and templates",
};

const font = Inter({
	display: "swap",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});

export default function RootLayout(props: LayoutProps<"/">) {
	return (
		<html lang="en">
			<body className={`${font.className} bg-black min-h-screen`}>
				{props.children}
			</body>
		</html>
	);
}
