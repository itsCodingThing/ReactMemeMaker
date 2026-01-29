import { list } from "@vercel/blob";
import { encode } from "js-base64";
import Image from "next/image";
import Link from "next/link";

export default async function ImageGrid() {
	const images = await list();

	return (
		<div className="columns-2 md:columns-3 lg:columns-4">
			{images.blobs.map((image) => (
				<Link key={image.pathname} href={`/editor/${encode(image.url)}`}>
					<Image
						className="cursor-pointer border-4 border-orange-400 m-1"
						width={168}
						height={168}
						alt={image.pathname}
						src={image.url}
						role="presentation"
						priority
					/>
				</Link>
			))}
		</div>
	);
}
