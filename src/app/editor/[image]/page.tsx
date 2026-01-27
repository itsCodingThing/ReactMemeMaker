"use client";

import Canvas from "@/components/editor/canvas";
import { decode } from "js-base64";
import { useParams } from "next/navigation";

export default function EditorPage() {
  const params = useParams<{ image: string }>();
  const imageSrc = decode(params.image);

  return <Canvas img={imageSrc} />;
}
