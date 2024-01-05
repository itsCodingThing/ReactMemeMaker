"use client";

import { Base64 } from "js-base64";
import { createPortal } from "react-dom";
import { IoMdCloseCircleOutline as CloseIcon } from "react-icons/io";
import Canvas from "@/editor/Canvas";
import { useRouter } from "next/navigation";

function Modal({ imageSrc, close = () => {} }: { imageSrc: string; close?: () => void }) {
    return (
        <div className="min-w-screen absolute top-0 h-screen min-h-screen w-screen bg-stone-800/80 p-5">
            <div className="relative h-full">
                <button
                    className="absolute right-0 top-0 text-4xl text-white"
                    onClick={() => {
                        close();
                    }}
                >
                    <CloseIcon />
                </button>
                <div className="grid h-full place-items-center">
                    <Canvas img={imageSrc}>
                        {/* <AddImage />
                        <AddText text="Random Text" x={100} y={300} />
                        <GenerateImage /> */}
                        <div></div>
                    </Canvas>
                </div>
            </div>
        </div>
    );
}

export default function EditorModal({ params }: { params: { image: string } }) {
    const imageSrc = Base64.decode(params.image);
    const router = useRouter();

    return createPortal(
        <Modal
            imageSrc={imageSrc}
            close={() => {
                router.back();
            }}
        />,
        document.body,
    );
}
