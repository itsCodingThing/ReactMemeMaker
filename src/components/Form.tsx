interface MemeFormProps {
    changeText: () => {};
    download: () => {};
}

export default function MemeForm() {
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
                />
            </form>
            <button className="btn btn-primary">Download Meme!</button>
        </div>
    );
}
