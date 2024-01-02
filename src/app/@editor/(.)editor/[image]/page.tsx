"use client";

import { Base64 } from "js-base64";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Editor from "@/editor/Editor";

export default function EditorModal({ params }: { params: { image: string } }) {
    const imageSrc = Base64.decode(params.image);
    const router = useRouter();
    const dialogRef = useRef<HTMLDivElement>(null);

    function onDismiss() {
        router.back();
    }

    return createPortal(
        <div className="absolute top-0 bg-stone-800/80 min-h-screen w-screen" ref={dialogRef}>
            <div className="grid place-items-center">
                <Editor imageSrc={imageSrc} />
            </div>
        </div>,
        document.body,
    );
}
