import "@/styles/tailwind.css";
import "@/styles/app.css";

import { type Metadata } from "next";
import { Lora } from "next/font/google";

export const metadata: Metadata = {
	title: "react meme maker",
	description: "meme maker in react",
};

const font = Lora({
	display: "swap",
	weight: ["400", "700"],
});

export default function RootLayout(props: LayoutProps<"/">) {
	return (
		<html lang="en">
			<body className={`${font.className} bg-slate-300`}>{props.children}</body>
		</html>
	);
}
