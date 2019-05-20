import React from "react";
import { FormGroup, Label } from "reactstrap";

export default function MemeForm({ changeText, download }) {
  return (
    <div className="meme-form">
      <FormGroup>
        <Label for="toptext">Top Text</Label>
        <input
          className="form-control"
          type="text"
          name="toptext"
          id="toptext"
          placeholder="Add text to the top"
          onChange={changeText}
        />
      </FormGroup>
      <FormGroup>
        <Label for="bottomtext">Bottom Text</Label>
        <input
          className="form-control"
          type="text"
          name="bottomtext"
          id="bottomtext"
          placeholder="Add text to the bottom"
          onChange={changeText}
        />
      </FormGroup>
      <button onClick={() => download()} className="btn btn-primary">
        Download Meme!
      </button>
    </div>
  );
}
