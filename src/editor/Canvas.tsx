"use client";

import { Fragment, type ReactNode, useState } from "react";
import { createPortal } from "react-dom";
import { FaDownload as DownloadIcon } from "react-icons/fa";
import { IoText as TextIcon } from "react-icons/io5";
import { CanvasProvider, useCanvas } from "./Context";
import CanvasAPI from "@/utils/canvas";

export function GenerateImage() {
    const canvas = useCanvas();

    return (
        <button
            className="mr-1 bg-white p-1 text-4xl"
            onClick={() => {
                void canvas?.download();
            }}
        >
            <DownloadIcon />
        </button>
    );
}

export function AddText({ text = "", x, y }: { text?: string; x: number; y: number }) {
    const [inputText, setInputText] = useState(text);
    const [isSelected, setIsSelected] = useState(false);
    const canvas = useCanvas();

    return (
        <Fragment>
            <button
                className="mr-1 bg-white p-1 text-4xl"
                onClick={() => {
                    setIsSelected(true);
                }}
            >
                <TextIcon />
            </button>
            {isSelected
                ? createPortal(
                      <div className="absolute left-0 top-0 grid h-full w-full place-items-center">
                          <div className="rounded">
                              <input
                                  className="w-full rounded border-2 border-black bg-white p-1"
                                  type="text"
                                  placeholder="add text for image"
                                  onChange={(e) => {
                                      setInputText(e.currentTarget.value);
                                  }}
                              />
                              <button
                                  className="mr-1 bg-blue-500 p-2 font-bold"
                                  onClick={() => {
                                      if (canvas) {
                                          canvas.drawText(inputText, x, y);
                                      }

                                      setIsSelected(false);
                                  }}
                              >
                                  save
                              </button>
                              <button
                                  onClick={() => {
                                      setIsSelected(false);
                                  }}
                              >
                                  cancel
                              </button>
                          </div>
                      </div>,
                      document.body,
                  )
                : null}
        </Fragment>
    );
}

export function AddImage() {
    const canvas = useCanvas();

    if (canvas != null) {
        canvas.drawImage();
    }

    return null;
}

export default function Canvas({ children, loadImages = [] }: { children: ReactNode; loadImages?: string[] }) {
    const [canvas, setCanvas] = useState<CanvasAPI | null>(null);

    return (
        <div className="relative h-fit w-fit">
            {canvas != null ? (
                <CanvasProvider value={canvas}>{children}</CanvasProvider>
            ) : (
                <span className="text-5xl">Loading Canvas</span>
            )}

            <canvas
                ref={(el) => {
                    if (el) {
                        const canvasInstance = new CanvasAPI(el);

                        if (canvas == null && loadImages.length > 0) {
                            void canvasInstance.loadImages(loadImages).then(() => {
                                setCanvas(canvasInstance);
                            });
                        }

                        if (!canvas && loadImages.length === 0) {
                            setCanvas(canvasInstance);
                        }
                    }
                }}
                onMouseDown={(e) => {
                    if (canvas) {
                        canvas.selectText(e.clientX, e.clientY);
                    }
                }}
                onMouseMove={(e) => {
                    if (canvas) {
                        // canvas.selectAndMoveText(e.clientX, e.clientY);
                    }
                }}
            ></canvas>
        </div>
    );
}
