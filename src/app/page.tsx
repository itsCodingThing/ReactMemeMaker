import { list } from "@vercel/blob";
import ImageGrid from "./image-grid";

export default async function IndexPage() {
  const images = await list();

  return (
    <main className="container mx-auto min-h-dvh gap-2 py-3 grid grid-cols-4">
      <div className="col-span-1 text-slate-900">
        <nav className="mb-2 bg-slate-900 text-center text-xl text-white">
          Make-a-Meme
        </nav>
        <p className="text-center">
          You can add top and bottom text to a meme-template, move the text
          around and can save the image by downloading it.
        </p>
        <form className="mt-2">
          <label htmlFor="upload-image">select image: </label>
          <input
            name="imageFile"
            id="upload-image"
            type="file"
            accept="image/png"
            required
          />
          <button className="rounded bg-cyan-500 px-2 py-1" type="submit">
            Upload
          </button>
          <p>700 X 700, size &lt; 100kb</p>
        </form>
      </div>
      <div className="col-span-3">
        <ImageGrid images={images.blobs} />
      </div>
    </main>
  );
}
