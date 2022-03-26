import React from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngridientStyle from "./Ingridient.module.css";

export default function Ingridient({ src, name, price, onCardClick }) {
  return (
    <li onClick={onCardClick} className={`${IngridientStyle.head} mt-6 mb-8`}>
      <img src={src} alt="ingridienImage" className={`mb-1`} />
      <div className={`${IngridientStyle.priceWrap} mb-1`}>
        <p
          className={`${IngridientStyle.price} mr-2 text text_type_main-medium`}
        >
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${IngridientStyle.name} text text_type_main-default`}>
        {name}
      </p>
      <div>
        <Counter count={1} size="default" />
      </div>
    </li>
  );
}
Ingridient.propTypes = {
  elem: PropTypes.object,
  onCardClick: PropTypes.func.isRequired,
};
