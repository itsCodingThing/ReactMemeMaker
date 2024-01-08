"use client";

import { fileSave } from "browser-fs-access";

const MAXSIZE = 700;

function scaleDownImageSize(imageWidth: number, imageHeight: number) {
    let ratio = imageWidth / imageHeight;
    const size = { width: MAXSIZE, height: MAXSIZE };

    if (ratio < 1) {
        ratio = 1;
    }

    if (imageWidth > MAXSIZE && imageHeight > MAXSIZE) {
        size.height = size.width / ratio;
        return size;
    }

    if (imageWidth > MAXSIZE) {
        size.height = imageHeight;
        size.width = size.height * ratio;
        return size;
    }

    if (imageHeight > MAXSIZE) {
        size.width = imageWidth;
        size.height = size.width / ratio;

        return size;
    }

    return { width: imageWidth, height: imageHeight };
}

export async function loadImage(src: string) {
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", src);

    return await new Promise<HTMLImageElement>((resolve, reject) => {
        imageElement.addEventListener(
            "load",
            () => {
                resolve(imageElement);
            },
            { once: true },
        );

        imageElement.addEventListener(
            "error",
            () => {
                reject(new Error("unable to download image"));
            },
            { once: true },
        );
    });
}

export default class CanvasImperativeAPI {
    readonly #controller = new AbortController();
    readonly #MaxCanvasSize = {
        width: 700,
        height: 700,
    };

    readonly #canvas: HTMLCanvasElement;
    readonly #canvasCtx2d: CanvasRenderingContext2D;
    readonly #img: { el: HTMLImageElement; renderdWidth: number; renderHeight: number };

    readonly #state = {
        inSelectMode: false,
    };

    #isSelectModeActive = false;
    #numTexts: number = 0;
    #texts: Array<{
        id: number;
        value: string;
        x: number;
        y: number;
        color: string;
        width: number;
        height: number;
        font: string;
        isSelected: boolean;
    }> = [];

    constructor(canvasEle: HTMLCanvasElement, imageEle: HTMLImageElement) {
        this.#canvas = canvasEle;
        this.#canvasCtx2d = canvasEle.getContext("2d")!;
        this.#img = { el: imageEle, renderdWidth: 0, renderHeight: 0 };

        this.#drawImage();

        this.#canvas.addEventListener(
            "mousedown",
            (e) => {
                if (this.#isSelectModeActive) {
                    this.selectText(e.clientX, e.clientY);
                }
            },
            { signal: this.#controller.signal },
        );

        this.#canvas.addEventListener(
            "mousemove",
            (e) => {
                if (this.#isSelectModeActive) {
                    this.moveText(e.clientX, e.clientY);
                }
            },
            { signal: this.#controller.signal },
        );

        this.#canvas.addEventListener(
            "mouseup",
            (e) => {
                if (this.#isSelectModeActive) {
                    this.unselectText();
                }
            },
            { signal: this.#controller.signal },
        );
    }

    get isSelectModeActive() {
        return this.#isSelectModeActive;
    }

    set isSelectModeActive(active: boolean) {
        this.#isSelectModeActive = active;
    }

    #drawImage() {
        const img = this.#img.el;
        const size = scaleDownImageSize(img.naturalWidth, img.naturalHeight);

        this.#img.renderdWidth = size.width;
        this.#img.renderHeight = size.height;

        this.#canvas.setAttribute("width", size.width.toString());
        this.#canvas.setAttribute("height", size.height.toString());
        this.#canvasCtx2d.drawImage(img, 0, 0, size.width, size.height);
    }

    drawText(text: string, x: number, y: number, size: number = 50) {
        const color = "orange";
        const font = `${size}px Impact`;
        this.#numTexts = this.#numTexts + 1;

        this.#canvasCtx2d.font = font;
        this.#canvasCtx2d.fillStyle = color;

        const { actualBoundingBoxRight, actualBoundingBoxLeft } = this.#canvasCtx2d.measureText(text);

        const textNode = {
            id: this.#numTexts,
            value: text,
            x,
            y,
            color,
            width: actualBoundingBoxLeft + actualBoundingBoxRight,
            height: size,
            font,
            isSelected: false,
        };

        this.#canvasCtx2d.fillText(textNode.value, textNode.x, textNode.y);
        this.#texts.push(textNode);

        return textNode;
    }

    selectText(x: number, y: number) {
        const position = this.#cursorPosition(x, y);

        const list = this.#texts.map((txt) => {
            if (position.cursorX >= txt.x && position.cursorY <= txt.x + txt.width) {
                if (position.cursorY <= txt.y && position.cursorY >= txt.y - txt.height) {
                    return {
                        ...txt,
                        isSelected: true,
                    };
                }
            }

            return { ...txt, isSelected: false };
        });

        this.#texts = list;
    }

    unselectText() {
        const list = this.#texts.map((txt) => {
            if (txt.isSelected) {
                return {
                    ...txt,
                    isSelected: false,
                };
            }
            return txt;
        });

        this.#texts = list;
    }

    moveText(x: number, y: number) {
        if (this.#numTexts === 0) return;

        const position = this.#cursorPosition(x, y);
        const list = this.#texts.map((txt) => {
            if (txt.isSelected) {
                return {
                    ...txt,
                    x: position.cursorX - txt.width / 2,
                    y: position.cursorY + txt.height / 2,
                };
            }

            return txt;
        });
        this.#texts = list;

        this.#redraw();
    }

    #cursorPosition(x: number, y: number) {
        const box = this.#canvas.getBoundingClientRect();

        return {
            cursorX: x - box.left,
            cursorY: y - box.top,
        };
    }

    #redraw() {
        this.#canvasCtx2d.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#canvasCtx2d.drawImage(this.#img.el, 0, 0, this.#img.renderdWidth, this.#img.renderHeight);
        this.#texts.forEach((txt) => {
            this.#canvasCtx2d.font = txt.font;
            this.#canvasCtx2d.fillStyle = txt.color;
            this.#canvasCtx2d.fillText(txt.value, txt.x, txt.y);
        });
    }

    download() {
        async function saveBlobToFile(blob: Blob | null) {
            if (blob) {
                await fileSave(blob, {
                    fileName: "meme.png",
                    startIn: "downloads",
                });
            }

            console.log("no file to save");
        }

        this.#canvas.toBlob((blob) => {
            void saveBlobToFile(blob);
        }, "image/png");
    }

    destory() {
        console.log("destorying canvas");

        this.#canvasCtx2d.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#controller.abort();
    }
}
