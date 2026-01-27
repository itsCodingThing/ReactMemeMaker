import { useSetAtom } from "jotai";
import { DownloadIcon, HandPointer, TextIcon } from "../icons";
import { canvasStageRefAtom, canvasTextAtom } from "./canvas-atoms";
import { useAtomValue } from "jotai/react";

function SelectButton() {
	return (
		<button className="cursor-pointer p-2 text-2xl">
			<HandPointer />
		</button>
	);
}

function GenerateImage() {
	const canvasStageRef = useAtomValue(canvasStageRefAtom);

	return (
		<button
			onClick={() => {
				if (canvasStageRef) {
					const link = document.createElement("a");
					link.download = "download.png";
					link.href = canvasStageRef.toDataURL();
					link.setAttribute("class", "hidden");
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}
			}}
			className="cursor-pointer p-2 text-2xl"
		>
			<DownloadIcon />
		</button>
	);
}

function AddTextButton() {
	const setText = useSetAtom(canvasTextAtom);

	return (
		<button
			className="cursor-pointer p-2 text-2xl"
			onClick={() => {
				setText("hello world");
			}}
		>
			<TextIcon />
		</button>
	);
}

export function Toolbar() {
	return (
		<div className="mb-2 w-fit border-2 border-white p-1">
			<AddTextButton />
			<SelectButton />
			<GenerateImage />
		</div>
	);
}
