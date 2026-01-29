export function getSizeFromHeight(
	originalWidth: number,
	originalHeight: number,
	newHeight: number,
) {
	const aspectRatio = originalWidth / originalHeight;

	return {
		width: Math.round(newHeight * aspectRatio),
		height: newHeight,
		ratio: aspectRatio,
	};
}

export function scaleDownImage(
	originalWidth: number,
	originalHeight: number,
	maxWidth: number,
	maxHeight: number,
) {
	const scale = Math.min(
		maxWidth / originalWidth,
		maxHeight / originalHeight,
		1, // 🚫 never upscale
	);

	return {
		width: Math.round(originalWidth * scale),
		height: Math.round(originalHeight * scale),
		scale,
	};
}
