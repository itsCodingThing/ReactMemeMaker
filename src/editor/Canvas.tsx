"use client";
import { ReactNode, useEffect, useState } from "react";
import { CanvasProvider, useCanvas } from "./Context";
import CanvasAPI from "@/utils/canvas";
import { FaDownload as DownloadIcon } from "react-icons/fa";

export function GenerateImage() {
    const canvas = useCanvas();

    return (
        <button
            className="text-5xl bg-white absolute top-0 right-10"
            onClick={() => {
                canvas?.download();
            }}
        >
            <DownloadIcon />
        </button>
    );
}

export function AddText({ text = "", x, y }: { text?: string; x: number; y: number }) {
    const canvas = useCanvas();

    if (canvas) {
        canvas.drawText(text, x, y);
    }

    return null;
}

export function AddImage() {
    const canvas = useCanvas();

    if (canvas) {
        canvas.drawImage();
    }

    return null;
}

export default function Canvas({ children, loadImages = [] }: { children: ReactNode; loadImages?: string[] }) {
    const [canvas, setCanvas] = useState<CanvasAPI | null>(null);

    return (
        <div className="relative">
            <canvas
                ref={(el) => {
                    if (el) {
                        const canvasInstance = new CanvasAPI(el);

                        if (!canvas && loadImages.length > 0) {
                            canvasInstance.loadImages(loadImages).then(() => {
                                setCanvas(canvasInstance);
                            });
                        }

                        if (!canvas && loadImages.length === 0) {
                            setCanvas(canvasInstance);
                        }
                    }
                }}
                onMouseMove={() => {
                    console.log("mouse move");
                }}
            ></canvas>
            {canvas ? <CanvasProvider value={canvas}>{children}</CanvasProvider> : null}
        </div>
    );
}
