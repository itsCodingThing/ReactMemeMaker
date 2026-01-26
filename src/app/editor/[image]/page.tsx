import { Base64 } from "js-base64";
import Board from "@/components/editor/canvas";

export default async function EditorPage(props: PageProps<"/editor/[image]">) {
	const { image } = await props.params;
	const imageSrc = Base64.decode(image);

	return (
		<div className="grid min-h-screen place-items-center">
			<Board img={imageSrc} />
		</div>
	);
}
