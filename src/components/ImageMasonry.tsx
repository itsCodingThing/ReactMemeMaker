/* eslint-disable @next/next/no-img-element */

export default function ImageMasonry({
    photos,
    openImage,
}: {
    photos: { src: string }[];
    openImage: (index: number) => {};
}) {
    return (
        <div className="grid grid-cols-4 lg:grid-cols-6 gap-2">
            {photos.map((image, index) => (
                <div className="w-[168px] h-[168px] relative" key={image.src}>
                    <span className="font-['Impact'] absolute top-0 w-full text-center text-xl uppercase p-1 text-white bg-slate-800/80">
                        Top text
                    </span>
                    <img
                        style={{
                            width: "100%",
                            cursor: "pointer",
                            height: "100%",
                        }}
                        alt={index.toString()}
                        src={image.src}
                        onClick={() => openImage(index)}
                        role="presentation"
                    />
                    <span className="font-['Impact'] absolute bottom-0 w-full text-center text-xl uppercase p-1 text-white bg-slate-800/80">
                        Bottom text
                    </span>
                </div>
            ))}
        </div>
    );
}
