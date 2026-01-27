import { Layer, Stage } from "react-konva";
import RemoteImage from "./remote-image";

export default function Canvas({ img = "" }: { img?: string }) {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <RemoteImage src={img} />
      </Layer>
    </Stage>
  );
}
