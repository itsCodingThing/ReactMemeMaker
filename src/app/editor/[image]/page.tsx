/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useEffect, useRef } from "react";

interface PageProps {
    params: { image: string };
}

const MAXSIZE = 700;

function scaleDownImageSize(imageWidth: number, imageHeight: number) {
    const size = { width: MAXSIZE, height: MAXSIZE };
    const ratio = imageWidth / imageHeight;

    if (imageWidth > MAXSIZE && imageHeight > MAXSIZE) {
        size.height = size.width / ratio;
    } else if (imageWidth > MAXSIZE) {
        size.height = imageHeight;
        size.width = size.height * ratio;
    } else if (imageHeight > MAXSIZE) {
        size.width = imageWidth;
        size.height = size.width / ratio;
    }

    return size;
}

function LoadImage(src: string, signal: AbortSignal) {
    const controller = new AbortController();
    const img = new Image();
    img.src = src;

    return new Promise<HTMLImageElement>((resolve, reject) => {
        if (signal.aborted) {
            reject(signal.reason);
        }

        img.decode()
            .then(() => {
                resolve(img);
            })
            .catch((e) => {
                reject(e);
            })
            .finally(() => {
                controller.abort();
            });

        signal.addEventListener(
            "abort",
            () => {
                reject(signal.reason);
            },
            { signal: controller.signal },
        );
    });
}

export default function EditorPage({ params }: PageProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("image params: ", params.image);
        const controller = new AbortController();

        LoadImage(`/images/${params.image}`, controller.signal).then((img) => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                console.log("image load event");

                if (ctx) {
                    const size = scaleDownImageSize(img.naturalWidth, img.naturalHeight);
                    canvas.width = size.width;
                    canvas.height = size.height;

                    ctx.drawImage(img, 0, 0, size.width, size.height);

                    ctx.font = "50px serif";
                    ctx.fillStyle = "orange";
                }
            }
        });

        return () => {
            controller.abort("unmount");
        };
    }, [params.image]);

    const downloadImage = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const canvasdata = canvas.toDataURL("image/png");
            const a = document.createElement("a");
            a.download = "meme.png";
            a.href = canvasdata;
            a.click();
            a.remove();
        }
    };

    const onInputChange = (type: "top" | "bottom", values: string) => {
        if (!["top", "bottom"].includes(type)) {
            return;
        }

        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            if (ctx) {
                ctx.fillText(values, 0, 50);
            }
        }
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        downloadImage();
    };

    return (
        <div className="container mx-auto pt-6 grid grid-cols-4 gap-1">
            <div className="col-span-3 bg-black grid place-items-center">
                <div className="max-w-[700px] max-h-[700px] overflow-hidden">
                    <canvas ref={canvasRef} className="bg-white" />
                </div>
            </div>
            <div className="col-span-1 bg-black">
                <form onSubmit={onSubmit}>
                    <div className="mb-2">
                        <label htmlFor="toptext" className="mr-2">
                            Top Text
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="toptext"
                            id="toptext"
                            placeholder="Add text to the top"
                            onChange={(e) => onInputChange("top", e.currentTarget.value)}
                        />
                    </div>

                    <div className="mb-2">
                        <label htmlFor="bottomtext" className="mr-2">
                            Bottom Text
                        </label>
                        <input
                            className="form-control"
                            type="text"
                            name="bottomtext"
                            id="bottomtext"
                            placeholder="Add text to the bottom"
                        />
                    </div>

                    <button type="submit" className="px-2 py-1 bg-orange-700 rounded">
                        Download Meme!
                    </button>
                </form>
            </div>
        </div>
    );
}
