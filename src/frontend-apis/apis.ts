export async function fetchImageURLById(id: string): Promise<{ url: string }> {
    const response = await fetch(`/api?id=${id}`);

    if (!response.ok) {
        throw new Error("Image fetching error");
    }

    const data = await response.json();
    return data;
}
