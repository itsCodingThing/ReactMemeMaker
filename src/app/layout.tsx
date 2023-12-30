import "../styles/tailwind.css";
import "../styles/app.css";

import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
    title: "react meme maker",
    description: "meme maker in react",
};

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-neutral-400">{props.children}</body>
        </html>
    );
}
