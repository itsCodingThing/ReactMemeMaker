"use client";

import { useActionState, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { uploadImage } from "./actions";
import { Field, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { LoaderCircleIcon } from "@/components/icons";

export default function ImageUpload() {
	const [state, formAction, isPending] = useActionState(uploadImage, {
		success: true,
	});
	const [sizeError, setSizeError] = useState<String | null>(null);

	return (
		<Card>
			<CardContent>
				<form
					className="flex flex-col gap-3"
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
					<Field>
						<Input name="imageFile" id="select-file" type="file" />
						{sizeError && (
							<FieldDescription className="text-red-600">
								{sizeError}
							</FieldDescription>
						)}
						{isPending ? (
							<Button size="icon">
								<LoaderCircleIcon className="animate-spin" />
							</Button>
						) : (
							<Button type="submit">Submit</Button>
						)}
						{!state.success && (
							<FieldDescription className="text-red-600">
								{state.error}
							</FieldDescription>
						)}
						<FieldDescription>image &lt; 700kb</FieldDescription>
					</Field>
				</form>
			</CardContent>
		</Card>
	);
}
