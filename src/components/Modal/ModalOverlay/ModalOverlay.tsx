import React, { FC, MouseEventHandler } from "react";
import PropTypes from "prop-types";
import OverlayStyle from "./ModalOverlay.module.css";

interface IModalOverlay {
  closeModalOverlay: MouseEventHandler<HTMLDivElement>;
}

const ModalOverlay: FC<IModalOverlay> = ({ closeModalOverlay }) => {
  return (
    <div onClick={closeModalOverlay} className={OverlayStyle.mainOverlay}></div>
  );
};
ModalOverlay.propTypes = {
  closeModalOverlay: PropTypes.func.isRequired,
};

export default ModalOverlay;
