import useImage from "use-image";
import { Image, Text } from "react-konva";
import { useSetAtom } from "jotai";
import { canvasImgAtom } from "./canvas-atoms";
import { useEffect } from "react";

function getSizeFromHeight(
	originalWidth: number,
	originalHeight: number,
	newHeight: number,
) {
	const aspectRatio = originalWidth / originalHeight;

	return {
		width: Math.round(newHeight * aspectRatio),
		height: newHeight,
		ratio: aspectRatio,
	};
}
export default function RemoteImage({ src }: { src: string }) {
	const [image, state] = useImage(src, "anonymous");
	const setCanvasImage = useSetAtom(canvasImgAtom);

	useEffect(() => {
		if (image) {
			const size = getSizeFromHeight(
				image.naturalWidth,
				image.naturalHeight,
				500,
			);
			setCanvasImage({
				originalSize: {
					width: image.naturalWidth,
					height: image.naturalHeight,
				},
				currentSize: { width: size.width, height: size.height },
				ratio: size.ratio,
				url: image.src,
			});
		}
	}, [image]);

	if (state === "failed") {
		return <Text text="unable to load image" />;
	}

	if (state === "loaded" && image) {
		const size = getSizeFromHeight(
			image.naturalWidth,
			image.naturalHeight,
			500,
		);

		return <Image image={image} width={size.width} height={size.height} />;
	}
}
