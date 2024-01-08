import { atom, Provider, useAtom } from "jotai";
import type CanvasImperativeAPI from "@/utils/canvas-api";

const canvasAPI = atom<CanvasImperativeAPI | null>(null);
const canvasMode = atom({
    inSelectMode: false,
});

export function useCanvasMode() {
    return useAtom(canvasMode);
}

export function useCanvasImperativeAPI() {
    return useAtom(canvasAPI);
}

export const CanvasProvider = Provider;
