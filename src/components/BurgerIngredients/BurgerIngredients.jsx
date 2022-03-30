import React from "react";
import mainStyle from "./BurgerIngredients.module.css";
import Tabs from "./Tab/Tab";
import PropTypes from "prop-types";
import IngridientsList from "./IngredientsList/IngredientsList";
import { ingredientsPropTypes } from "../../utils/constants";

export default function BurgerIngredients({ handleElement, data }) {
  /*
  function handleIngredientCard(evt) {
    //Таргетинг на конкретного родителя
    const cardElement = evt.currentTarget.querySelector(
      ".text_type_main-default"
    ).textContent;
    function cardItem(arr, element) {
      return arr.find((item) => item.name === element);
    }
    const card = cardItem(data, cardElement);
    handleElement(card);
  }
*/
  const bun = data.filter((element) => element.type === "bun");
  const main = data.filter((element) => element.type === "main");
  const sauce = data.filter((element) => element.type === "sauce");
  return (
    <>
      <section className={mainStyle.head}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        <Tabs />
        <div className={mainStyle.list}>
          <IngridientsList
            name={"Булки"}
            data={bun}
            onCardClick={handleElement}
          />
          <IngridientsList
            name={"Соусы"}
            data={sauce}
            onCardClick={handleElement}
          />
          <IngridientsList
            name={"Начинки"}
            data={main}
            onCardClick={handleElement}
          />
        </div>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
  handleElement: PropTypes.func.isRequired,
};
