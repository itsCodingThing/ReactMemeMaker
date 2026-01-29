"use client";

import { useActionState, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";

import { uploadImage } from "./actions";

export default function ImageUpload() {
	const [state, formAction, isPending] = useActionState(uploadImage, {
		success: true,
	});
	const [sizeError, setSizeError] = useState<String | null>(null);

	return (
		<form
			className="mt-2 p-1 flex flex-col gap-1"
			action={(formData: FormData) => {
				const file = formData.get("imageFile") as File;
				if (!file) {
					return;
				}

				const fileSize = Math.floor(file.size / 1024);
				if (fileSize > 100) {
					setSizeError("image too big");
					return;
				}

				formAction(formData);
			}}
		>
			<input
				className="rounded bg-amber-50 p-1 hover:border border-black"
				name="imageFile"
				type="file"
				accept="image/*"
				required
			/>
			<button
				disabled={isPending}
				className="rounded bg-cyan-500 px-2 py-1"
				type="submit"
			>
				{isPending ? (
					<LuLoaderCircle className="animate-spin mx-auto" size={25} />
				) : (
					"Upload"
				)}
			</button>
			{sizeError ? <p className="text-red-600">{sizeError}</p> : null}
			<p>700 X 700, size &lt; 100kb</p>
			{state.success ? null : <p className="text-red-600">{state.error}</p>}
		</form>
	);
}
