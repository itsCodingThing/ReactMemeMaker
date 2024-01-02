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

export function loadImage(src: string, signal?: AbortSignal) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = document.createElement("img");
        img.setAttribute("src", src);

        img.addEventListener(
            "load",
            () => {
                resolve(img);
            },
            { signal, once: true },
        );

        img.addEventListener(
            "error",
            () => {
                reject("image loading error");
            },
            { signal, once: true },
        );
    });
}

export default class CanvasAPI {
    #canvas: HTMLCanvasElement;
    #ctx: CanvasRenderingContext2D;

    #imgs: HTMLImageElement[];

    constructor(el: HTMLCanvasElement) {
        this.#canvas = el;
        this.#ctx = el.getContext("2d")!;
        this.#imgs = [];
    }

    async loadImages(srcs: string[]) {
        const images = await Promise.all(srcs.map((src) => loadImage(src)));
        this.#imgs = images;
    }

    drawImage() {
        this.#imgs.forEach((img) => {
            const size = scaleDownImageSize(img.naturalWidth, img.naturalHeight);
            this.#canvas.setAttribute("width", size.width.toString());
            this.#canvas.setAttribute("height", size.height.toString());

            this.#ctx.drawImage(img, 0, 0, size.width, size.height);
        });
    }

    drawText(text: string, x: number, y: number) {
        this.#ctx.font = "50px Impact";
        this.#ctx.fillStyle = "orange";
        this.#ctx.fillText(text, x, y);
    }

    download() {
        const canvasdata = this.#canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.download = "meme.png";
        a.href = canvasdata;
        a.click();
        a.remove();
    }
}
