import React from "react";
import PropTypes from "prop-types";
import ItemStyle from "./IngridientDetails.module.css";
import { ingredientsPropTypes } from "../../../utils/constants";

export default function IngredientDetails({ ingredient }) {
  //console.log(ingredient);
  return (
    <div className={`${ItemStyle.head} pr-25 pb-15 pl-25`}>
      <img src={ingredient.image_large} alt={ingredient.name} />
      <p
        className={`${ItemStyle.alignment} text text_type_main-medium mt-4 mb-8`}
      >
        {ingredient.name}
      </p>
      <ul className={ItemStyle.list}>
        <li className={`${ItemStyle.element} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории, ккал
          </p>
          <p
            className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
          >
            {ingredient.calories}
          </p>
        </li>
        <li className={`${ItemStyle.element} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p
            className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
          >
            {ingredient.proteins}
          </p>
        </li>
        <li className={`${ItemStyle.element} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p
            className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
          >
            {ingredient.fat}
          </p>
        </li>
        <li className={`${ItemStyle.element} mr-5`}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p
            className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
          >
            {ingredient.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientsPropTypes.isRequired,
};
