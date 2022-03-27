import React from "react";
import PropTypes from "prop-types";
import OverlayStyle from "./ModalOverlay.module.css";

export default function ModalOverlay({ children, closeModalOverlay }) {
  return (
    <div onClick={closeModalOverlay} className={OverlayStyle.mainOverlay}>
      {children}
    </div>
  );
}
ModalOverlay.propTypes = {
  closeModalOverlay: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};
