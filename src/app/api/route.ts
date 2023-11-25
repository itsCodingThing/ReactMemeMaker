import { getAllImages } from "@/utils/firebase";

export async function GET() {
    const list = await getAllImages();
    return Response.json(
        list.map((image) => {
            return {
                ...image,
                src: image.publicUrl,
            };
        })
    );
}
