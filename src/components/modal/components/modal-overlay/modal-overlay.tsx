import React from "react";
import ModalOverlayStyle from "./modal-overlay.module.css";

type Props = {
  onClickModalOverlay: () => void;
};

const ModalOverlay = ({ onClickModalOverlay }: Props) => {
  return (
    <div onClick={onClickModalOverlay} className={ModalOverlayStyle.main} />
  );
};

export default ModalOverlay;
