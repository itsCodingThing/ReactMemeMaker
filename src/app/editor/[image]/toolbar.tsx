import { useSetAtom } from "jotai";
import { DownloadIcon, TextIcon } from "@/components/icons";
import { canvasStageRefAtom, canvasTextAtom } from "./canvas-atoms";
import { useAtomValue } from "jotai/react";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

function AddTextButton() {
	const setText = useSetAtom(canvasTextAtom);

	return (
		<Dialog>
			<form
				onSubmit={(e) => {
					e.preventDefault();

					const formData = new FormData(e.currentTarget);
					const data = Object.fromEntries(formData.entries());

					console.log(data);
				}}
			>
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
					<div>
						<Input name="text" placeholder="add text..." />
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit">Add</Button>
					</DialogFooter>
				</DialogContent>
			</form>
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
