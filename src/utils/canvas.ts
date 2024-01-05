"use client";

const MAXSIZE = 700;

export function scaleDownImageSize(imageWidth: number, imageHeight: number) {
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

export async function loadImageElement(src: string) {
    return await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = document.createElement("img");
        img.setAttribute("src", src);

        img.addEventListener(
            "load",
            () => {
                resolve(img);
            },
            { once: true },
        );

        img.addEventListener(
            "error",
            () => {
                reject(new Error("image loading error"));
            },
            { once: true },
        );
    });
}

export default class CanvasAPI {
    readonly #offscreenCanvas: OffscreenCanvas = new OffscreenCanvas(700, 700);
    readonly #offscreenCanvasCtx2d: OffscreenCanvasRenderingContext2D = this.#offscreenCanvas.getContext("2d")!;

    readonly #canvas: HTMLCanvasElement;
    readonly #imgs: HTMLImageElement[] = [];

    constructor(el: HTMLCanvasElement) {
        this.#canvas = el;
    }

    render() {
        this.#drawImage();
        this.#canvas.getContext("2d")?.drawImage(this.#offscreenCanvas, 0, 0);
    }

    async loadImage(src: string) {
        const image = await loadImageElement(src);
        this.#imgs.push(image);
    }

    #drawImage() {
        this.#imgs.forEach((img) => {
            const size = scaleDownImageSize(img.naturalWidth, img.naturalHeight);

            this.#canvas.setAttribute("width", size.width.toString());
            this.#canvas.setAttribute("height", size.height.toString());

            this.#offscreenCanvasCtx2d.drawImage(img, 0, 0, size.width, size.height);
        });
    }

    // readonly #state = {
    //     inSelectMode: false,
    // };
    // #numTexts: number = 0;
    // #texts: Array<{
    //     id: number;
    //     value: string;
    //     x: number;
    //     y: number;
    //     color: string;
    //     width: number;
    //     height: number;
    //     font: string;
    //     isSelected: boolean;
    // }> = [];
    // #cursorPosition(clientX: number, clientY: number) {
    //     const rect = this.#canvas.getBoundingClientRect();

    //     return {
    //         cursorX: clientX - rect.left,
    //         cursorY: clientY - rect.top,
    //     };
    // }

    // drawText(text: string, x: number, y: number) {
    //     const color = "orange";
    //     const font = "50px Impact";

    //     this.#numTexts = this.#numTexts + 1;
    //     const { actualBoundingBoxRight, actualBoundingBoxLeft } = this.#ctx.measureText(text);

    //     const textNode = {
    //         id: this.#numTexts,
    //         value: text,
    //         x,
    //         y,
    //         color,
    //         width: actualBoundingBoxLeft + actualBoundingBoxRight,
    //         height: 0,
    //         font,
    //         isSelected: false,
    //     };
    //     this.#texts.push(textNode);

    //     this.#texts.forEach((txt) => {
    //         this.#ctx.font = txt.font;
    //         this.#ctx.fillStyle = txt.color;
    //         this.#ctx.fillText(txt.value, txt.x, txt.y);
    //     });

    //     return textNode;
    // }

    // selectText(x: number, y: number) {
    //     if (this.#numTexts === 0) return;

    //     const position = this.#cursorPosition(x, y);

    //     console.log(position);

    //     const list = this.#texts.map((txt) => {
    //         console.log(txt);
    //         if (
    //             position.cursorX >= x &&
    //             position.cursorY <= x + txt.width &&
    //             position.cursorY >= y &&
    //             position.cursorY <= y + 50
    //         ) {
    //             return {
    //                 ...txt,
    //                 x: position.cursorX,
    //                 y: position.cursorY,
    //                 isSelected: true,
    //             };
    //         }

    //         return txt;
    //     });
    //     this.#texts = list;
    // }

    // selectAndMoveText(x: number, y: number) {
    //     if (this.#numTexts === 0) return;

    //     const position = this.#cursorPosition(x, y);
    //     const list = this.#texts.map((txt) => {
    //         if (txt.isSelected) {
    //             return {
    //                 ...txt,
    //                 x: position.cursorX,
    //                 y: position.cursorY,
    //             };
    //         }

    //         return txt;
    //     });
    //     this.#texts = list;

    //     this.drawImage();
    //     this.#texts.forEach((txt) => {
    //         this.#ctx.font = txt.font;
    //         this.#ctx.fillStyle = txt.color;
    //         this.#ctx.fillText(txt.value, txt.x, txt.y);
    //     });
    // }

    // download() {
    //     async function saveBlobToFile(blob: Blob | null) {
    //         if (blob) {
    //             await fileSave(blob, {
    //                 fileName: "meme.png",
    //                 startIn: "downloads",
    //             });
    //         }

    //         console.log("no file to save");
    //     }

    //     this.#canvas.toBlob((blob) => {
    //         void saveBlobToFile(blob);
    //     }, "image/png");
    // }
}
