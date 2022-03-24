import React from "react";
import PropTypes from "prop-types";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

export default function ConstructorBlock(props) {
  return (
    <ConstructorElement
      type={props.type}
      isLocked={props.isLocked}
      text={props.text}
      price={props.price}
      thumbnail={props.thumbnail}
    />
  );
}
ConstructorBlock.propTypes = {
  props: PropTypes.object,
};
