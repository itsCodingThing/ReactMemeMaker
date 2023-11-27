import { z } from "zod";
import { getDownloadUrl } from "@/utils/firebase";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const reponse = { url: "" };

    try {
        const id = z.string().parse(searchParams.get("id"));
        reponse.url = getDownloadUrl(id);
    } catch (error) {
        reponse.url = "";
    }

    return Response.json(reponse);
}
