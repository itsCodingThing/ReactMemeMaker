import { atom } from "jotai";
import konva from "konva";

interface ImageAtom {
	originalSize: { width: number; height: number };
	currentSize: { width: number; height: number };
	ratio: number;
	url: string;
}
export const canvasImgAtom = atom<ImageAtom | null>(null);
export const canvasTextAtom = atom({ text: "", color: "#000000" });
export const canvasStageRefAtom = atom<konva.Stage | null>(null);
