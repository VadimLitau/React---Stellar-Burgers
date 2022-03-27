import React from "react";
import Ingredient from "../Ingredient/Ingredient";
import List from "./IngredientsList.module.css";
import { ingredientsPropTypes } from "../../../utils/constants";
import PropTypes from "prop-types";

export default function IngredientsList({ data, name, onCardClick }) {
  return (
    <section className={List.head}>
      <p className={`text text_type_main-medium mt-10`}>{name}</p>
      <ul className={`${List.item} ml-4 mr-4`}>
        {data.map((item) => (
          <Ingredient
            info={data}
            name={item.name}
            key={item._id}
            src={item.image}
            price={item.price}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </section>
  );
}
IngredientsList.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
  name: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
};
