import { initializeApp, cert, App } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import { Base64 } from "js-base64";

export const photos = [
    { src: "/images/vict-baby.png" },
    { src: "/images/ned.jpeg" },
    { src: "/images/devilgirl.jpg" },
    { src: "/images/trump.jpg" },
    { src: "/images/one-does-not.jpg" },
    { src: "/images/dank.png" },
    { src: "/images/boy.png" },
    { src: "/images/sad.png" },
    { src: "/images/wolf.png" },
    { src: "/images/fry.jpg" },
    { src: "/images/jobs.jpg" },
    { src: "/images/phone.jpg" },
    { src: "/images/oldie.png" },
    { src: "/images/image.png" },
    { src: "/images/doubt.png" },
    { src: "/images/crying.png" },
    { src: "/images/sponge.png" },
    { src: "/images/dog.png" },
    { src: "/images/frust.png" },
    { src: "/images/web.png" },
    { src: "/images/penguin.png" },
];

const config = {
    projectId: process.env.project_id,
    privateKey: process.env.private_key,
    clientEmail: process.env.client_email,
};
const bucket = process.env.bucket;

let app;
if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithFire = global as typeof globalThis & {
        _firebaseApp?: App;
    };

    if (!globalWithFire._firebaseApp) {
        app = initializeApp({
            credential: cert(config),
            storageBucket: bucket,
        });

        globalWithFire._firebaseApp = app;
    }
    app = globalWithFire._firebaseApp;
} else {
    app = initializeApp({
        credential: cert(config),
        storageBucket: bucket,
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
    return photos.map((photo) => {
        const fileName = photo.src.split("/").pop() ?? "";

        return {
            name: fileName,
            id: "",
            publicUrl: photo.src,
            src: Base64.encodeURI(photo.src),
        };
    });

    // try {
    //     const [files] = await GBucket.getFiles();
    //     const data = await Promise.all(
    //         files.map(async (file) => {
    //             const [isPublic] = await file.isPublic();

    //             if (!isPublic) {
    //                 await file.makePublic();
    //             }

    //             return {
    //                 name: file.name,
    //                 id: file.id ?? "",
    //                 publicUrl: file.publicUrl(),
    //                 src: file.publicUrl(),
    //             };
    //         })
    //     );

    //     return data;
    // } catch (error) {
    //     return photos.map((photo) => {
    //         const fileName = photo.src.split("/").pop() ?? "";

    //         return {
    //             name: fileName,
    //             id: "",
    //             publicUrl: photo.src,
    //             src: photo.src,
    //         };
    //     });
    // }
}

export function getDownloadUrl(id: string) {
    return GBucket.file(id).publicUrl();
}
