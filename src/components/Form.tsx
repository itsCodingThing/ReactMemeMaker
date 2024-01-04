export default function MemeForm() {
    return (
        <form>
            <div className="mb-2">
                <label htmlFor="toptext">Top Text</label>
                <input
                    className="form-control"
                    type="text"
                    name="toptext"
                    id="toptext"
                    placeholder="Add text to the top"
                />
            </div>

            <div className="mb-2">
                <label htmlFor="bottomtext">Bottom Text</label>
                <input
                    className="form-control"
                    type="text"
                    name="bottomtext"
                    id="bottomtext"
                    placeholder="Add text to the bottom"
                />
            </div>

            <button className="rounded bg-orange-700 px-2 py-1">Download Meme!</button>
        </form>
    );
}
