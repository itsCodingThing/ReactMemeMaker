import Link from "next/link";
import Image from "next/image";
import { getAllImages } from "@/utils/firebase";
import { uploadImage } from "@/server-actions/upload";

export default async function IndexPage() {
    const photos = await getAllImages();

    return (
        <main className="container mx-auto grid grid-cols-4 gap-2 py-3">
            <div className="col-span-1 font-['Impact']">
                <nav className="bg-slate-900 text-white text-xl text-center mb-2">Make-a-Meme</nav>
                <p className="text-center">
                    You can add top and bottom text to a meme-template, move the text around and can save the image by
                    downloading it.
                </p>
                <form className="mt-2" action={uploadImage}>
                    <label htmlFor="upload-image">select image: </label>
                    <input name="uploadImage" id="upload-image" type="file" required />
                    <button className="bg-cyan-500 px-2 py-1 rounded" type="submit">
                        Upload
                    </button>
                </form>
            </div>
            <div className="col-span-3">
                <div className="grid grid-cols-4 xl:grid-cols-6 gap-2">
                    {photos.map((image, index) => (
                        <Link href={`/editor/${image.name}`} key={index}>
                            <div className="w-[168px] h-[168px] relative rounded border-4 border-orange-400">
                                <Image
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    width={168}
                                    height={168}
                                    alt={index.toString()}
                                    src={image.src}
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
