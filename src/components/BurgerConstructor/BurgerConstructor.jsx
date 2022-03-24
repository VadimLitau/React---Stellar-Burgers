import React from "react";
import PropTypes from "prop-types";
import ConstructorStyle from "./BurgerConstructor.module.css";
import { bun, BurgersData } from "../../utils/data";
import ConstructorBlock from "./ConstructorBlock/ConstructorBlock";
import {
  Button,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Substract from "../../images/BurgerConstructor/Subtract.png";
/*Достаточно долго ломал голову, не понимаю как в моей реализации кода, проверить входящие данные, т.к они приходят после работы с .filter и опционно возвращаются массивом
Проверка через стандртное .propTypes не дает необходимого результата. Допускаю что я неправильно реализовал сам BurgerConstructor*/
export default function BurgerConstructor() {
  return (
    <section className={`${ConstructorStyle.head} ml-10`}>
      <ul className={`${ConstructorStyle.list} mt-25`}>
        {bun.map((item) => {
          if (item._id === "60666c42cc7b410027a1a9b1") {
            return (
              <li key={item._id} className={`${ConstructorStyle.element} pr-4`}>
                <ConstructorBlock
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
        {BurgersData.map((item) => {
          if (item.type != "bun") {
            return (
              <li
                key={item._id}
                className={`${ConstructorStyle.element}  mb-4 pr-2`}
              >
                <span className={`mr-2`}>
                  <DragIcon />
                </span>
                <ConstructorBlock
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
          if (item._id === "60666c42cc7b410027a1a9b1") {
            return (
              <li key={item._id} className={`${ConstructorStyle.element} pr-4`}>
                <ConstructorBlock
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
        <img src={Substract} alt="icon" className={`mr-10`} />
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
