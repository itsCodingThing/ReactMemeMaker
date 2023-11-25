interface MemeFormProps {
    changeText: () => {};
    download: () => {};
}

export default function MemeForm({ changeText, download }: MemeFormProps) {
    return (
        <div>
            <form>
                <label htmlFor="toptext">Top Text</label>
                <input
                    className="form-control"
                    type="text"
                    name="toptext"
                    id="toptext"
                    placeholder="Add text to the top"
                    onChange={changeText}
                />
            </form>
            <form>
                <label htmlFor="bottomtext">Bottom Text</label>
                <input
                    className="form-control"
                    type="text"
                    name="bottomtext"
                    id="bottomtext"
                    placeholder="Add text to the bottom"
                    onChange={changeText}
                />
            </form>
            <button onClick={() => download()} className="btn btn-primary">
                Download Meme!
            </button>
        </div>
    );
}
