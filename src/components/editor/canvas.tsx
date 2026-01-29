import { Layer, Stage, Image } from "react-konva";
import { useAtom } from "jotai";
import { canvasImgAtom, canvasStageRefAtom } from "./canvas-atoms";
import { useSetAtom } from "jotai/react";
import useImage from "use-image";
import { useEffect } from "react";
import { scaleDownImage } from "@/utils/image-resize";

interface CanvasProps {
	img: string;
}

export default function Canvas({ img = "" }: CanvasProps) {
	const [image, state] = useImage(img, "anonymous");
	const setCanvasStageRef = useSetAtom(canvasStageRefAtom);
	const [canvasImg, setCanvasImage] = useAtom(canvasImgAtom);

	useEffect(() => {
		if (image) {
			const size = scaleDownImage(
				image.naturalWidth,
				image.naturalHeight,
				300,
				300,
			);

			setCanvasImage({
				originalSize: {
					width: image.naturalWidth,
					height: image.naturalHeight,
				},
				currentSize: { width: size.width, height: size.height },
				ratio: image.naturalWidth / image.naturalHeight,
				url: image.src,
			});
		}
	}, [image]);

	if (state === "loaded" && image && canvasImg) {
		return (
			<Stage
				ref={(ref) => {
					setCanvasStageRef(ref);
				}}
				className="bg-white w-fit"
				width={canvasImg.currentSize.width}
				height={canvasImg.currentSize.height}
			>
				<Layer>
					<Image
						image={image}
						width={canvasImg.currentSize.width}
						height={canvasImg.currentSize.height}
					/>
				</Layer>
			</Stage>
		);
	}

	return null;
}
