"use client";

import Canvas from "./canvas";
import { Toolbar } from "./toolbar";
import { decode } from "js-base64";
import { useParams } from "next/navigation";
import { Provider } from "jotai";

export default function EditorPage() {
	const params = useParams<{ image: string }>();
	const imageSrc = decode(params.image);

	return (
		<Provider>
			<div className="bg-gradient-neutral min-h-screen flex flex-col items-center justify-center gap-6 p-6">
				<Toolbar />
				<Canvas img={imageSrc} />
			</div>
		</Provider>
	);
}
