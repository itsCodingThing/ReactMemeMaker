import "@/styles/tailwind.css";
import "@/styles/app.css";

import { Metadata } from "next";
import { ReactNode } from "react";
import StyledComponentRegistr from "@/StyledComponentRegister";

export const metadata: Metadata = {
    title: "react meme maker",
    description: "meme maker in react",
};

export default function RootLayout(props: { children: ReactNode; editor: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen h-screen bg-slate-400">
                <StyledComponentRegistr>
                    {props.children}
                    {props.editor}
                </StyledComponentRegistr>
            </body>
        </html>
    );
}
