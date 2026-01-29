import { Suspense } from "react";
import ImageGrid from "./image-grid";
import ImageUpload from "./image-upload";

export default async function IndexPage() {
	return (
		<main className="container mx-auto min-h-dvh gap-2 py-3 lg:grid lg:grid-cols-4">
			<div className="col-span-1 text-slate-900">
				<nav className="mb-2 bg-slate-900 text-center text-xl text-white">
					Make-a-Meme
				</nav>
				<p className="text-center">
					You can add top and bottom text to a meme-template, move the text
					around and can save the image by downloading it.
				</p>
				<ImageUpload />
			</div>
			<div className="col-span-3">
				<Suspense fallback={<p className="text-center">loading images</p>}>
					<ImageGrid />
				</Suspense>
			</div>
		</main>
	);
}
