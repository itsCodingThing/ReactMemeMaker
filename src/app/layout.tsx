import "@/styles/tailwind.css";
import "@/styles/app.css";

import { type Metadata } from "next";
import { type ReactNode } from "react";

export const metadata: Metadata = {
    title: "react meme maker",
    description: "meme maker in react",
};

export default function RootLayout(props: { children: ReactNode; editor: ReactNode }) {
    return (
        <html lang="en">
            <body className="h-screen min-h-screen bg-slate-400">
                {props.children}
                {props.editor}
            </body>
        </html>
    );
}
