import { ReactNode } from "react";

export default function EditorLayout({ children }: { children: ReactNode }) {
    return <div className="container mx-auto min-h-full">{children}</div>;
}
