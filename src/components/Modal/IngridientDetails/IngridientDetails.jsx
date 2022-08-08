import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ItemStyle from "./IngridientDetails.module.css";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getBurgerDataRequest } from "../../../utils/Api";
import { checkResponse } from "../../../utils/constants";
import { getApiBurgerData } from "../../../services/actions";
export default function IngredientDetails() {
  const { id } = useParams();
  const data = useSelector((store) => {
    return store.item.burgerData;
  });
  const ingredientForModal = data.find((ingr) => ingr._id === id);

  console.log(data);
  console.log(id);
  // console.log(ingredientForModal);
  // console.log(location);
  //const id = location.state.id;
  // console.log(ingredient);
  //console.log(ingredientForModal);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   document.title = "react burger";
  //   dispatch(getApiBurgerData());
  // }, [id]);
  // function getApiBurgerDatas() {
  //   fetch(`https://norma.nomoreparties.space/api/ingredients`)
  //     .then(checkResponse)
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  return (
    <>
      {ingredientForModal && (
        <div className={`${ItemStyle.head} pr-25 pb-15 pl-25`}>
          <img
            src={ingredientForModal.image_large}
            alt={ingredientForModal.name}
          />
          <p
            className={`${ItemStyle.alignment} text text_type_main-medium mt-4 mb-8`}
          >
            {ingredientForModal.name}
          </p>
          <ul className={ItemStyle.list}>
            <li className={`${ItemStyle.element} mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Калории, ккал
              </p>
              <p
                className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
              >
                {ingredientForModal.calories}
              </p>
            </li>
            <li className={`${ItemStyle.element} mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Белки, г
              </p>
              <p
                className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
              >
                {ingredientForModal.proteins}
              </p>
            </li>
            <li className={`${ItemStyle.element} mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Жиры, г
              </p>
              <p
                className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
              >
                {ingredientForModal.fat}
              </p>
            </li>
            <li className={`${ItemStyle.element} mr-5`}>
              <p className="text text_type_main-default text_color_inactive mb-2">
                Углеводы, г
              </p>
              <p
                className={`${ItemStyle.alignment} text text_type_main-default text_color_inactive`}
              >
                {ingredientForModal.carbohydrates}
              </p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
