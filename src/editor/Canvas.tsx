"use client";

import CanvasAPI from "@/utils/canvas";
import { type ElementRef, type ReactNode, useRef, useEffect } from "react";

export default function Canvas({ children, img = "" }: { children: ReactNode; img?: string }) {
    const canvasRef = useRef<ElementRef<"canvas">>(null);

    useEffect(() => {
        async function loadAndRender() {
            if (canvasRef.current) {
                console.log(canvasRef.current);

                const canvas = new CanvasAPI(canvasRef.current);

                await canvas.loadImage(img);
                canvas.render();
            }
        }

        loadAndRender();
    }, [img]);

    return (
        <div className="relative h-fit w-fit">
            {children}
            <canvas ref={canvasRef}></canvas>
        </div>
    );
}
// import { createPortal } from "react-dom";
// import { IoText as TextIcon } from "react-icons/io5";
// import { Fragment, type ReactNode, useState, useRef, ElementRef } from "react";
// import { FaDownload as DownloadIcon } from "react-icons/fa";
// import { CanvasProvider, useCanvas } from "./Context";
// import CanvasAPI from "@/utils/canvas";

// export function GenerateImage() {
//     const canvas = useCanvas();

//     return (
//         <button
//             className="mr-1 bg-white p-1 text-4xl"
//             onClick={() => {
//                 void canvas?.download();
//             }}
//         >
//             <DownloadIcon />
//         </button>
//     );
// }

// export function AddText({ text = "", x, y }: { text?: string; x: number; y: number }) {
//     const [inputText, setInputText] = useState(text);
//     const [isSelected, setIsSelected] = useState(false);
//     const canvas = useCanvas();

//     return (
//         <Fragment>
//             <button
//                 className="mr-1 bg-white p-1 text-4xl"
//                 onClick={() => {
//                     setIsSelected(true);
//                 }}
//             >
//                 <TextIcon />
//             </button>
//             {isSelected
//                 ? createPortal(
//                       <div className="absolute left-0 top-0 grid h-full w-full place-items-center">
//                           <div className="rounded bg-white p-5">
//                               <input
//                                   className="mb-2 w-full rounded border-2 border-black bg-white p-2"
//                                   type="text"
//                                   placeholder="add text for image"
//                                   onChange={(e) => {
//                                       setInputText(e.currentTarget.value);
//                                   }}
//                               />
//                               <div className="w-full">
//                                   <button
//                                       className="mr-1 rounded bg-blue-500 p-2 text-xl font-bold text-white"
//                                       onClick={() => {
//                                           if (canvas) {
//                                               canvas.drawText(inputText, x, y);
//                                           }

//                                           setIsSelected(false);
//                                       }}
//                                   >
//                                       save
//                                   </button>
//                                   <button
//                                       className="mr-1 rounded bg-blue-500 p-2 text-xl font-bold text-white"
//                                       onClick={() => {
//                                           setIsSelected(false);
//                                       }}
//                                   >
//                                       cancel
//                                   </button>
//                               </div>
//                           </div>
//                       </div>,
//                       document.body,
//                   )
//                 : null}
//         </Fragment>
//     );
// }

// export function AddImage() {
//     const canvas = useCanvas();

//     if (canvas != null) {
//         canvas.drawImage();
//     }

//     return null;
// }

// {/* <CanvasProvider value={isLoading}> */}
// {/* </CanvasProvider> */}
