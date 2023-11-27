import "../styles/tailwind.css";
import "../styles/app.css";

import { Metadata } from "next";
import { ReactNode } from "react";
import { QueryProvider } from "@/Providers";

export const metadata: Metadata = {
    title: "react meme maker",
    description: "meme maker in react",
};

export default function RootLayout(props: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <main className="container mx-auto grid grid-cols-4 py-3">
                    <div className="col-span-1">
                        <nav>Make-a-Meme</nav>
                        <p>
                            You can add top and bottom text to a meme-template, move the text around and can save the
                            image by downloading it.
                        </p>
                    </div>
                    <div className="col-span-3">
                        <QueryProvider>{props.children}</QueryProvider>
                    </div>
                </main>
            </body>
        </html>
    );
}
