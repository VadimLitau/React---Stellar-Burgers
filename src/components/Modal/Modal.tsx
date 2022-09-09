import React, { FC, MouseEvent } from "react";
import PropTypes from "prop-types";
import ModalStyle from "./Modal.module.css";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { useParams } from "react-router-dom";

interface IModal {
  children: any;
  title: string;
  closeModal: any;
}

const Modal: FC<IModal> = ({ children, title, closeModal }) => {
  const modalRoot: any = document.getElementById("react-modals");

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
  return createPortal(
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
  );
};
//Хм, интерсно, спасибо, надо будет попробовать)))
Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default Modal;
