import { Base64 } from "js-base64";

export const photos = [
	{ src: "/images/vict-baby.png" },
	{ src: "/images/ned.jpeg" },
	{ src: "/images/devilgirl.jpg" },
	{ src: "/images/trump.jpg" },
	{ src: "/images/one-does-not.jpg" },
	{ src: "/images/dank.png" },
	{ src: "/images/boy.png" },
	{ src: "/images/sad.png" },
	{ src: "/images/wolf.png" },
	{ src: "/images/fry.jpg" },
	{ src: "/images/jobs.jpg" },
	{ src: "/images/phone.jpg" },
	{ src: "/images/oldie.png" },
	{ src: "/images/image.png" },
	{ src: "/images/doubt.png" },
	{ src: "/images/crying.png" },
	{ src: "/images/sponge.png" },
	{ src: "/images/dog.png" },
	{ src: "/images/frust.png" },
	{ src: "/images/web.png" },
	{ src: "/images/penguin.png" },
];

export interface SavedImage {
	name: string;
	id: string;
	publicUrl: string;
	src: string;
}

export async function getAllImages(): Promise<SavedImage[]> {
	return photos.map((photo) => {
		const fileName = photo.src.split("/").pop() ?? "";

		return {
			name: fileName,
			id: "",
			publicUrl: photo.src,
			src: Base64.encodeURI(photo.src),
		};
	});
}
