/* eslint-disable @next/next/no-img-element */

export default function ImageMasonry({
    photos,
    openImage,
}: {
    photos: Array<{ src: string }>;
    openImage: (index: number) => void;
}) {
    return (
        <div className="grid grid-cols-4 gap-2 lg:grid-cols-6">
            {photos.map((image, index) => (
                <div className="relative h-[168px] w-[168px]" key={image.src}>
                    <span className="absolute top-0 w-full bg-slate-800/80 p-1 text-center font-['Impact'] text-xl uppercase text-white">
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
                        onClick={() => {
                            openImage(index);
                        }}
                        role="presentation"
                    />
                    <span className="absolute bottom-0 w-full bg-slate-800/80 p-1 text-center font-['Impact'] text-xl uppercase text-white">
                        Bottom text
                    </span>
                </div>
            ))}
        </div>
    );
}
