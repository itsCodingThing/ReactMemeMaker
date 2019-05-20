import React from "react";

export default function ImageMasonry({ photos, openImage }) {
  return (
    <div className="content">
      {photos.map((image, index) => (
        <div className="image-holder" key={image.src}>
          <span className="meme-top-caption">Top text</span>
          <img
            style={{
              width: "100%",
              cursor: "pointer",
              height: "100%"
            }}
            alt={index}
            src={image.src}
            onClick={() => openImage(index)}
            role="presentation"
          />
          <span className="meme-bottom-caption">Bottom text</span>
        </div>
      ))}
    </div>
  );
}
