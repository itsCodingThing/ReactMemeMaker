import { useSetAtom } from "jotai";
import { DownloadIcon, HandPointer, TextIcon } from "@/components/icons";
import { canvasStageRefAtom, canvasTextAtom } from "./canvas-atoms";
import { useAtomValue } from "jotai/react";

function SelectButton() {
	return (
		<button
			className="cursor-pointer p-2 text-2xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-300 rounded transition-colors duration-250"
			title="Select"
		>
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
			className="cursor-pointer p-2 text-2xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-300 rounded transition-colors duration-250"
			title="Download"
		>
			<DownloadIcon />
		</button>
	);
}

function AddTextButton() {
	const setText = useSetAtom(canvasTextAtom);

	return (
		<button
			className="cursor-pointer p-2 text-2xl text-neutral-700 hover:text-neutral-900 hover:bg-neutral-300 rounded transition-colors duration-250"
			title="Add Text"
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
		<div className="bg-neutral-200/80 backdrop-blur-sm rounded-lg shadow-medium border border-neutral-300 p-2 flex gap-2">
			<AddTextButton />
			<SelectButton />
			<GenerateImage />
		</div>
	);
}
