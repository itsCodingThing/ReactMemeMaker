"use client";

import { FormEvent, useReducer } from "react";
import Canvas, { AddImage, AddText, GenerateImage } from "./Canvas";

interface EditorProps {
    imageSrc: string;
}

function reducer(state: { topText: string; bottomText: string }, action: { type: "top" | "bottom"; value: string }) {
    switch (action.type) {
        case "top": {
            return {
                topText: action.value,
                bottomText: state.bottomText,
            };
        }
        case "bottom": {
            return {
                bottomText: action.value,
                topText: state.topText,
            };
        }
        default: {
            return state;
        }
    }
}

export default function Editor({ imageSrc }: EditorProps) {
    const [textState, dispatch] = useReducer(reducer, { topText: "top text", bottomText: "bottom text" });

    const onInputChange = (type: "top" | "bottom", value: string) => {
        if (!["top", "bottom"].includes(type)) {
            return;
        }

        dispatch({ type, value });
    };

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <div className="bg-neutral-400 w-fit p-1 rounded-sm flex flex-row-reverse gap-1">
            <Canvas loadImages={[imageSrc]}>
                <AddImage />
                <AddText text={textState.topText} x={100} y={300} />
                <AddText text={textState.bottomText} x={200} y={200} />
                <GenerateImage />
            </Canvas>
            <form onSubmit={onSubmit}>
                <input
                    className="w-full p-2 rounded border-2 border-black mb-1"
                    type="text"
                    placeholder="Add text to the top"
                    defaultValue={textState.topText}
                    onChange={(e) => onInputChange("top", e.currentTarget.value)}
                />

                <input
                    className="w-full p-2 rounded border-2 border-black mb-1"
                    type="text"
                    placeholder="Add text to the bottom"
                    defaultValue={textState.bottomText}
                    onChange={(e) => onInputChange("bottom", e.currentTarget.value)}
                />
            </form>
        </div>
    );
}
