import React from "react";
import { NavbarBrand } from "reactstrap";
export default function Sidebar() {
  return (
    <div className="sidebar">
      <NavbarBrand href="/">Make-a-Meme</NavbarBrand>
      <p>This is a fun 5 hour project inspired by imgur. Built with React.</p>
      <p>
        You can add top and bottom text to a meme-template, move the text around
        and can save the image by downloading it.
      </p>
    </div>
  );
}
