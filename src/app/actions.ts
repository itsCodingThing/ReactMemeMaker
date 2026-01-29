"use server";

import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";

type ActionState =
	| {
			success: false;
			error: string;
	  }
	| { success: true };

export async function uploadImage(
	_: ActionState,
	formData: FormData,
): Promise<ActionState> {
	try {
		const imageFile = formData.get("imageFile") as File;
		await put(imageFile.name, imageFile, {
			access: "public",
		});

		revalidatePath("/");
		return { success: true };
	} catch {
		return { success: false, error: "unable to upload image" };
	}
}
