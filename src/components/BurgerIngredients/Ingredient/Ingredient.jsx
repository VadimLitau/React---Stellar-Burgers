import React from "react";
import PropTypes from "prop-types";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientStyle from "./Ingredient.module.css";

export default function Ingredient({ info, src, name, price, onCardClick }) {
  function handleIngredientCard(evt) {
    //Таргетинг на конкретного родителя
    const cardElement = evt.currentTarget.querySelector(
      ".text_type_main-default"
    ).textContent;
    console.log(cardElement);
    function cardItem(arr, element) {
      return arr.find((item) => item.name === element);
    }
    const card = cardItem(info, cardElement);
    onCardClick(card);
  }
  return (
    <li
      onClick={handleIngredientCard}
      className={`${IngredientStyle.head} mt-6 mb-8`}
    >
      <img src={src} alt="ingridienImage" className={`mb-1`} />
      <div className={`${IngredientStyle.priceWrap} mb-1`}>
        <p
          className={`${IngredientStyle.price} mr-2 text text_type_digits-medium`}
        >
          {price}
        </p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${IngredientStyle.name} text text_type_main-default`}>
        {name}
      </p>
      <div>
        <Counter count={1} size="default" />
      </div>
    </li>
  );
}

Ingredient.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
