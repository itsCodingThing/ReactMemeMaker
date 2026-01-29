import { list } from "@vercel/blob";
import { encodeURI } from "js-base64";
import Image from "next/image";
import Link from "next/link";

export default async function ImageGrid() {
	const images = await list();

	return (
		<div className="columns-2 md:columns-3 lg:columns-4 gap-4">
			{images.blobs.map((image) => (
				<Link key={image.pathname} href={`/editor/${encodeURI(image.url)}`}>
					<div className="group overflow-hidden rounded-lg shadow-subtle hover:shadow-medium transition-all duration-250 m-1 border border-neutral-300">
						<Image
							className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-250"
							width={168}
							height={168}
							alt={image.pathname}
							src={image.url}
							role="presentation"
							priority
						/>
					</div>
				</Link>
			))}
		</div>
	);
}
