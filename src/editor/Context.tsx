import type CanvasAPI from "@/utils/canvas";
import { createContext, useContext } from "react";

// const CanvasContext = createContext<HTMLCanvasElement | null>(null);
const CanvasContext = createContext<CanvasAPI | null>(null);

export function useCanvas() {
    return useContext(CanvasContext);
}

export const CanvasProvider = CanvasContext.Provider;
