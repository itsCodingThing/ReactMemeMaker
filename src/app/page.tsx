import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ImageGrid from "./image-grid";
import ImageUpload from "./image-upload";

export default async function IndexPage() {
	return (
		<main className="container mx-auto min-h-screen gap-6 py-6 lg:grid lg:grid-cols-4">
			<div className="col-span-1 space-y-4 px-1">
				<nav className="bg-gradient-primary text-center text-xl text-white font-medium rounded-lg shadow-medium p-4">
					Make-a-Meme
				</nav>
				<Card>
					<CardContent>
						<p className="text-sm leading-relaxed text-neutral-700 text-center">
							You can add top and bottom text to a meme-template, move the text
							around and can save the image by downloading it.
						</p>
					</CardContent>
				</Card>
				<ImageUpload />
			</div>
			<div className="col-span-3">
				<Suspense
					fallback={
						<div className="flex items-center justify-center py-12">
							<div className="animate-pulse text-white">Loading images...</div>
						</div>
					}
				>
					<ImageGrid />
				</Suspense>
			</div>
		</main>
	);
}
