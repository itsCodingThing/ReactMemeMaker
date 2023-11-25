import React, { ReactNode } from "react";
import { createPortal } from "react-dom";

interface EditModelProps {
    modalIsOpen: boolean;
    toggle: () => {};
    children: ReactNode;
}

export default function EditModal({ modalIsOpen, toggle, children }: EditModelProps) {
    if (modalIsOpen) {
        return createPortal(
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div>
                    Make-a-Meme <button onClick={toggle}>close</button>
                </div>
                <div>{children}</div>
            </div>,
            document.body
        );
    }

    return null;
}
