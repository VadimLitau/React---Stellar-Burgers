import React from "react";
import PropTypes from "prop-types";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientsPropTypes } from "../../utils/constants";
import Substract from "../../images/BurgerConstructor/Subtract.png";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
/*Достаточно долго ломал голову, не понимаю как в моей реализации кода, проверить входящие данные, т.к они приходят после работы с .filter и опционно возвращаются массивом
Проверка через стандртное .propTypes не дает необходимого результата. Допускаю что я неправильно реализовал сам BurgerConstructor*/
export default function BurgerConstructor({ data, openModal }) {
  const bun = data.filter((element) => element.type === "bun");
  return (
    <section className={`${ConstructorStyle.head} ml-10`}>
      <ul className={`${ConstructorStyle.list} mt-25`}>
        {bun.map((item) => {
          if (item._id === "60d3b41abdacab0026a733c6") {
            return (
              <li key={item._id} className={`${ConstructorStyle.element} pr-4`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          }
        })}
      </ul>

      <ul
        className={`${ConstructorStyle.list} ${ConstructorStyle.element_scroll} ml-4 mr-4`}
      >
        {data.map((item) => {
          if (item.type != "bun") {
            return (
              <li
                key={item._id}
                className={`${ConstructorStyle.element}  mb-4 pr-2`}
              >
                <span className={`mr-2`}>
                  <DragIcon />
                </span>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          }
        })}
      </ul>
      <ul className={`${ConstructorStyle.list} mb-10`}>
        {bun.map((item) => {
          if (item._id === "60d3b41abdacab0026a733c6") {
            return (
              <li key={item._id} className={`${ConstructorStyle.element} pr-4`}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          }
        })}
      </ul>
      <div className={`${ConstructorStyle.sell} mr-4 mb-10`}>
        <p className={`text text_type_digits-medium mr-3`}>610</p>
        <div className={`${ConstructorStyle.logo} pr-10`}>
          <CurrencyIcon />
        </div>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
  openModal: PropTypes.func.isRequired,
};
