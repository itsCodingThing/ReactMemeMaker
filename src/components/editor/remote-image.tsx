import useImage from "use-image";
import { Image, Text } from "react-konva";

export default function RemoteImage({ src }: { src: string }) {
	const [image, state] = useImage(src, "anonymous");

	if (state === "failed") {
		return <Text text="unable to load image" />;
	}

	if (state === "loaded" && image) {
		return <Image image={image} draggable />;
	}
}
