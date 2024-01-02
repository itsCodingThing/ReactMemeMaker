import Editor from "@/editor/Editor";
import { Base64 } from "js-base64";

interface PageProps {
    params: { image: string };
}

export default function EditorPage({ params }: PageProps) {
    const imageSrc = Base64.decode(params.image);
    return <Editor imageSrc={imageSrc} />;
}
