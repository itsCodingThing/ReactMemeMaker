import { Base64 } from "js-base64";
import Board from "@/components/editor/canvas";

interface PageProps {
    params: { image: string };
}

export default function EditorPage({ params }: PageProps) {
    const imageSrc = Base64.decode(params.image);

    return (
        <div className="container mx-auto bg-white">
            <Board img={imageSrc}>
                <div></div>
            </Board>
        </div>
    );
}
