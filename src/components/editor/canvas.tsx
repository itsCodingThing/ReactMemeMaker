import { Layer, Stage, Text } from "react-konva";
import RemoteImage from "./remote-image";
import { useAtomValue } from "jotai";
import {
	canvasImgAtom,
	canvasStageRefAtom,
	canvasTextAtom,
} from "./canvas-atoms";
import { useSetAtom } from "jotai/react";

interface CanvasProps {
	img: string;
}

export default function Canvas({ img = "" }: CanvasProps) {
	const canvasImg = useAtomValue(canvasImgAtom);
	const canvasText = useAtomValue(canvasTextAtom);
	const setCanvasStageRef = useSetAtom(canvasStageRefAtom);

	return (
		<Stage
			ref={(ref) => {
				setCanvasStageRef(ref);
			}}
			className="bg-white w-fit"
			width={canvasImg?.currentSize.width ?? 700}
			height={canvasImg?.currentSize.height ?? 700}
		>
			<Layer>
				<RemoteImage src={img} />

				{canvasText.length > 0 && (
					<Text text={canvasText} fontSize={100} draggable />
				)}
			</Layer>
		</Stage>
	);
}
