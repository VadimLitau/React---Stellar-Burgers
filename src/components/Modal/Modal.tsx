import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ModalStyle from "./Modal.module.css";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay/ModalOverlay";

interface IModal {
  children: ReactNode;
  title: string;
  closeModal: () => void;
}

const Modal: FC<IModal> = ({ children, title, closeModal }) => {
  const modalRoot = document.getElementById("react-modals");

  useEffect(() => {
    const handleEscClose = (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [closeModal]);
  return modalRoot
    ? ReactDOM.createPortal(
        <>
          <section>
            <ModalOverlay closeModalOverlay={closeModal} />
            <div className={ModalStyle.container}>
              <div className={`${ModalStyle.text} pt-10 pr-10 pl-10`}>
                <h1 className="text text_type_main-large">{title}</h1>
                <button className={ModalStyle.button} onClick={closeModal}>
                  <CloseIcon type="primary" />
                </button>
              </div>
              {children}
            </div>
          </section>
        </>,
        modalRoot
      )
    : null;
};
Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
