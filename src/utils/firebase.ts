import { initializeApp, cert, App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

let app;

if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithFire = global as typeof globalThis & {
        _firebaseApp?: App;
    };

    if (!globalWithFire._firebaseApp) {
        app = initializeApp({
            credential: cert({
                projectId: process.env.project_id,
                privateKey: process.env.private_key,
                clientEmail: process.env.client_email,
            }),
            storageBucket: process.env.google_bucket,
        });

        globalWithFire._firebaseApp = app;
    }
    app = globalWithFire._firebaseApp;
} else {
    app = initializeApp({
        credential: cert({
            projectId: process.env.project_id,
            privateKey: process.env.private_key,
            clientEmail: process.env.client_email,
        }),
        storageBucket: process.env.google_bucket,
    });
}

const GBucket = getStorage(app).bucket();

export interface SavedImage {
    name: string;
    id: string;
    publicUrl: string;
    src: string;
}

export async function getAllImages(): Promise<SavedImage[]> {
    const [files] = await GBucket.getFiles();
    const data = await Promise.all(
        files.map(async (file) => {
            const [isPublic] = await file.isPublic();

            if (!isPublic) {
                await file.makePublic();
            }

            return {
                name: file.name,
                id: file.id ?? "",
                publicUrl: file.publicUrl(),
                src: "",
            };
        })
    );

    return data;
}
