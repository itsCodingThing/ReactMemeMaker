import { Layer, Stage, Image } from "react-konva";
import { useAtom } from "jotai";
import { canvasImgAtom, canvasStageRefAtom } from "./canvas-atoms";
import { useSetAtom } from "jotai/react";
import useImage from "use-image";
import { useEffect } from "react";
import { scaleDownImage } from "@/utils/image-resize";
import { useMediaQuery } from "@uidotdev/usehooks";

interface CanvasProps {
	img: string;
}

export default function Canvas({ img = "" }: CanvasProps) {
	const [image, state] = useImage(img, "anonymous");
	const setCanvasStageRef = useSetAtom(canvasStageRefAtom);
	const [canvasImg, setCanvasImage] = useAtom(canvasImgAtom);
	const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

	useEffect(() => {
		if (image) {
			const length = isSmallDevice ? 300 : 500;
			const size = scaleDownImage(
				image.naturalWidth,
				image.naturalHeight,
				length,
				length,
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
	}, [image, isSmallDevice]);

	if (state === "loaded" && image && canvasImg) {
		return (
			<Stage
				ref={(ref) => {
					setCanvasStageRef(ref);
				}}
				className="border border-neutral-300"
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
