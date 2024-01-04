import Link from "next/link";
import Image from "next/image";
import { Base64 } from "js-base64";
import { getAllImages } from "@/utils/firebase";

export default async function IndexPage() {
    const photos = await getAllImages();

    return (
        <main className="container mx-auto grid h-full grid-cols-4 gap-2 py-3">
            <div className="col-span-1 font-['Impact'] text-slate-900">
                <nav className="mb-2 bg-slate-900 text-center text-xl text-white">Make-a-Meme</nav>
                <p className="text-center">
                    You can add top and bottom text to a meme-template, move the text around and can save the image by
                    downloading it.
                </p>
                <form className="mt-2">
                    <label htmlFor="upload-image">select image: </label>
                    <input name="imageFile" id="upload-image" type="file" accept="image/png" required />
                    <button className="rounded bg-cyan-500 px-2 py-1" type="submit">
                        Upload
                    </button>
                    <p>700 X 700, size &lt; 100kb</p>
                </form>
            </div>
            <div className="col-span-3">
                <div className="grid grid-cols-4 gap-2 xl:grid-cols-6">
                    {photos.map((image, index) => (
                        <Link href={`/editor/${image.src}`} key={index}>
                            <div className="relative h-[168px] w-[168px] rounded border-4 border-orange-400">
                                <Image
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    width={168}
                                    height={168}
                                    alt={index.toString()}
                                    src={Base64.decode(image.src)}
                                    role="presentation"
                                    priority
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
