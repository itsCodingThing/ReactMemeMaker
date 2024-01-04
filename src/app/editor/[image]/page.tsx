import { Base64 } from "js-base64";
import Canvas, { AddImage, AddText, GenerateImage } from "@/editor/Canvas";

interface PageProps {
    params: { image: string };
}

export default function EditorPage({ params }: PageProps) {
    const imageSrc = Base64.decode(params.image);

    return (
        <div className="container mx-auto bg-white">
            <Canvas loadImages={[imageSrc]}>
                <AddImage />
                <AddText text="Random Text" x={0} y={300} />
                <GenerateImage />
            </Canvas>
        </div>
    );
}
