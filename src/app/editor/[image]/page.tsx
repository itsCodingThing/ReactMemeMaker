"use client";

import Canvas from "@/components/editor/canvas";
import { Toolbar } from "@/components/editor/toolbar";
import { decode } from "js-base64";
import { useParams } from "next/navigation";
import { Provider } from "jotai";

export default function EditorPage() {
	const params = useParams<{ image: string }>();
	const imageSrc = decode(params.image);

	return (
		<Provider>
			<div className="bg-gray-700 h-dvh flex flex-col items-center justify-center">
				<Toolbar />
				<Canvas img={imageSrc} />
			</div>
		</Provider>
	);
}
