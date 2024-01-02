"use server";

import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
    const file = formData.get("imageFile");

    if (!file) {
        console.log("no file is found");
    }

    console.log(file);
    revalidatePath("/");
}
