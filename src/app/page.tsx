import Link from "next/link";
import Image from "next/image";
import { getAllImages } from "@/utils/firebase";

export default async function ImageMasonry() {
    const photos = await getAllImages();

    return (
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
            {photos.map((image, index) => (
                <Link href={`/editor/${image.id}`} key={image.id}>
                    <div className="w-[168px] h-[168px] relative rounded border-8 border-orange-400">
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
                        />
                    </div>
                </Link>
            ))}
        </div>
    );
}
