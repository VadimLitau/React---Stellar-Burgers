import React from "react";
import PropTypes from "prop-types";
import ModalStyle from "./Modal.module.css";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { createPortal } from "react-dom";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

export default function ModalOrder({ children, title, closeModal }) {
  // const location = useLocation();
  // console.log(location.state.background);
  // const { id } = useParams();
  // const dataFeed = useSelector((store) => store.ws.messages);
  // let data;
  // let order;
  // if (dataFeed.length > 0) {
  //   //console.log(dataFeed);
  //   data = dataFeed[`${dataFeed.length - 1}`].orders;
  // }

  // if (data) {
  //   order = data.find((el) => el._id === id);
  // }
  // console.log(order);
  //const dataFeed = useSelector((store) => store.route.userAuthProfile);
  // console.log(dataFeed);
  const modalRoot = document.getElementById("react-modals");

  useEffect(() => {
    const handleEscClose = (evt) => {
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
}
//Хм, интерсно, спасибо, надо будет попробовать)))
ModalOrder.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
