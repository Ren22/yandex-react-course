import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalOverlay from "./components/modal-overlay/modal-overlay";
import modalStyle from "./modal.module.css";

type Props = {
  header?: string;
  children?: React.ReactNode;
  closeModal: () => void;
};

const modalRoot = document.getElementById("react-modals");

const Modal = ({ children, header, closeModal }: Props) => {
  useEffect(() => {
    function closeByEscape(evt: KeyboardEvent) {
      if (evt.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    };
  }, [closeModal]);

  if (!modalRoot) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClickModalOverlay={closeModal} />
      <div className={modalStyle.modalContent}>
        <section className={`${modalStyle.modal}`}>
          <header
            className={`${modalStyle.header} pl-10 pr-10 pt-10 text text_type_main-large`}
          >
            {header ? (
              header
            ) : (
              <div className={modalStyle.header__spacer}></div>
            )}
            <div onClick={closeModal} className={modalStyle.closeIcon}>
              <CloseIcon type="primary" />
            </div>
          </header>
          <section className={modalStyle.children}>{children}</section>
        </section>
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
