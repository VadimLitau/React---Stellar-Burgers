import React from "react";
import PropTypes from "prop-types";
import OverlayStyle from "./ModalOverlay.module.css";

export default function ModalOverlay({ children }) {
  return <div className={OverlayStyle.mainOverlay}>{children}</div>;
}
ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};
