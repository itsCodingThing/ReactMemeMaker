import Canvas from "@/components/editor/canvas";
import { decode } from "js-base64";

export default async function EditorPage(props: PageProps<"/editor/[image]">) {
	const { image } = await props.params;
	const imageSrc = decode(image);

	return <Canvas img={imageSrc} />;
}
