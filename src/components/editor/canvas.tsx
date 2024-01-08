"use client";

import { type ElementRef, useRef, useEffect } from "react";
import { CanvasProvider, useCanvasImperativeAPI } from "./canvas-context";
import { Toolbar } from "./toolbar";
import CanvasImperativeAPI, { loadImage } from "@/utils/canvas-api";

function Canvas({ img }: { img: string }) {
    const canvasRef = useRef<ElementRef<"canvas">>(null);
    const [, setCanvasImperativeAPI] = useCanvasImperativeAPI();

    useEffect(() => {
        if (canvasRef.current) {
            const ref = canvasRef.current;
            let canvas: CanvasImperativeAPI;

            const loadAndRender = async () => {
                const imgEle = await loadImage(img);
                canvas = new CanvasImperativeAPI(ref, imgEle);
                setCanvasImperativeAPI(canvas);
            };

            loadAndRender();

            return () => {
                canvas?.destory();
            };
        }
    }, [img, setCanvasImperativeAPI]);

    return (
        <div className="h-fil w-fit border-2 border-white p-1">
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}

export default function Board({ img = "" }: { img?: string }) {
    return (
        <CanvasProvider>
            <div className="relative h-fit w-fit">
                <Toolbar />
                <Canvas img={img} />
            </div>
        </CanvasProvider>
    );
}
