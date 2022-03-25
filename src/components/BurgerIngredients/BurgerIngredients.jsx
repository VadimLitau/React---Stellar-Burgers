import React from "react";
import mainStyle from "./BurgerIngredients.module.css";
import Tabs from "./Tab/Tab";
import PropTypes from "prop-types";
import IngridientsList from "./IngridientsList/IngridientsList";
import { ingredientsPropTypes } from "../../utils/constants";

export default function BurgerIngredients({ sauce, main, bun }) {
  return (
    <>
      <section className={mainStyle.head}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        <Tabs />
        <div className={mainStyle.list}>
          <IngridientsList name={"Булки"} data={bun} />
          <IngridientsList name={"Соусы"} data={sauce} />
          <IngridientsList name={"Начинки"} data={main} />
        </div>
      </section>
    </>
  );
}

BurgerIngredients.propTypes = {
  sauce: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
  main: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
  bun: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};
