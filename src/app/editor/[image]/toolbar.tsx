import { useSetAtom } from "jotai";
import { CheckIcon, DownloadIcon, TextIcon } from "@/components/icons";
import { canvasStageRefAtom, canvasTextAtom } from "./canvas-atoms";
import { useAtomValue } from "jotai/react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
	DialogHeader,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

function GenerateImage() {
	const canvasStageRef = useAtomValue(canvasStageRefAtom);

	return (
		<Button
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
			title="Download"
		>
			<DownloadIcon />
		</Button>
	);
}

const colors = [
	{ name: "black", hex: "#000000", css: "bg-black" },
	{ name: "white", hex: "#FFFFFF", css: "bg-white" },
	{ name: "blue", hex: "#2b7fff", css: "bg-blue-500" },
	{ name: "yellow", hex: "#f0b100", css: "bg-yellow-500" },
	{ name: "red", hex: "#fb2c36", css: "bg-red-500" },
];
function AddTextButton() {
	const setText = useSetAtom(canvasTextAtom);
	const [color, setColor] = useState(colors[0]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button title="Add Text">
					<TextIcon />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Text</DialogTitle>
					<DialogDescription>add text on the image</DialogDescription>
				</DialogHeader>
				<form
					className="flex flex-col gap-1"
					onSubmit={(e) => {
						e.preventDefault();

						const formData = new FormData(e.currentTarget);
						const input = formData.get("text") as string;
						setText({ text: input ?? "", color: color.hex });
					}}
				>
					<Input name="text" placeholder="add text..." />
					<div className="border rounded-sm border-black p-1 flex gap-1">
						{colors.map((c) => {
							return (
								<Badge
									key={c.name}
									variant="secondary"
									className={cn(
										c.css,
										c.name === "black" && "text-white",
										"cursor-pointer border border-black",
									)}
									onClick={() => {
										setColor(c);
									}}
								>
									{color.name === c.name && <CheckIcon />}
									{c.name}
								</Badge>
							);
						})}
					</div>
					<Button type="submit">Add</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export function Toolbar() {
	return (
		<ButtonGroup>
			<AddTextButton />
		</ButtonGroup>
	);
}
