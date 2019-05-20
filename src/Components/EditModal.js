import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

export default function EditModal({ modalIsOpen, toggle, children }) {
  return (
    <Modal className="meme-gen-modal" isOpen={modalIsOpen}>
      <ModalHeader toggle={toggle}>Make-a-Meme</ModalHeader>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}
