import { useState, Fragment } from "react";
import { createPortal } from "react-dom";
import { useCanvasImperativeAPI, useCanvasMode } from "./canvas-context";
import { DownloadIcon, HandPointer, TextIcon } from "../icons";

function SelectButton() {
    const [mode, setMode] = useCanvasMode();
    const [canvas] = useCanvasImperativeAPI();

    return (
        <button
            className={mode.inSelectMode ? "mr-1 bg-black p-1 text-4xl" : "mr-1 bg-white p-1 text-4xl"}
            onClick={() => {
                if (canvas) {
                    setMode((prev) => {
                        canvas.isSelectModeActive = !prev.inSelectMode;
                        return { inSelectMode: !prev.inSelectMode };
                    });
                }
            }}
        >
            <HandPointer />
        </button>
    );
}

function GenerateImage() {
    const [canvas] = useCanvasImperativeAPI();
    const [mode] = useCanvasMode();

    return (
        <button
            disabled={mode.inSelectMode}
            className="bg-white p-1 text-4xl"
            onClick={() => {
                canvas?.download();
            }}
        >
            <DownloadIcon />
        </button>
    );
}

function AddTextButton() {
    const [inputText, setInputText] = useState("text");
    const [isSelected, setIsSelected] = useState(false);

    const [canvas] = useCanvasImperativeAPI();
    const [mode] = useCanvasMode();

    return (
        <Fragment>
            <button
                disabled={isSelected || mode.inSelectMode}
                className={isSelected ? "mr-1 bg-black p-1 text-4xl" : "mr-1 bg-white p-1 text-4xl"}
                onClick={() => {
                    setIsSelected(true);
                }}
            >
                <TextIcon />
            </button>
            {isSelected
                ? createPortal(
                      <div className="absolute left-0 top-0 grid h-full w-full place-items-center">
                          <div className="rounded bg-white p-5">
                              <input
                                  className="mb-2 w-full rounded border-2 border-black bg-white p-2"
                                  type="text"
                                  placeholder="add text for image"
                                  onChange={(e) => {
                                      setInputText(e.currentTarget.value);
                                  }}
                              />
                              <div className="w-full">
                                  <button
                                      className="mr-1 rounded bg-blue-500 p-2 text-xl font-bold text-white"
                                      onClick={() => {
                                          canvas?.drawText(inputText, 100, 100);
                                          setIsSelected(false);
                                      }}
                                  >
                                      save
                                  </button>
                                  <button
                                      className="mr-1 rounded bg-blue-500 p-2 text-xl font-bold text-white"
                                      onClick={() => {
                                          setIsSelected(false);
                                      }}
                                  >
                                      cancel
                                  </button>
                              </div>
                          </div>
                      </div>,
                      document.body,
                  )
                : null}
        </Fragment>
    );
}

export function Toolbar() {
    return (
        <div className="mb-2 w-fit border-2 border-white p-1">
            <AddTextButton />
            <SelectButton />
            <GenerateImage />
        </div>
    );
}
