import React from "react";
import PropTypes from "prop-types";
import ConstructorStyle from "./BurgerConstructor.module.css";
import { bun, BurgersData } from "../../utils/data";
import ConstructorBlock from "./ConstructorBlock/ConstructorBlock";
import {
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";

export default function BurgerConstructor() {
  return (
    <div className={ConstructorStyle.head}>
      <h1>Hello</h1>
      <ul>
        {bun.map((item) => {
          if (item._id === "60666c42cc7b410027a1a9b1") {
            return (
              <li key={item._id}>
                <ConstructorBlock
                  type="top"
                  isLocked={true}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          }
        })}
      </ul>

      <ul>
        {BurgersData.map((item) => {
          if (item.type != "bun") {
            return (
              <li key={item._id}>
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
      <ul>
        {bun.map((item) => {
          if (item._id === "60666c42cc7b410027a1a9b1") {
            return (
              <li key={item._id}>
                <ConstructorBlock
                  type="bottom"
                  isLocked={true}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          }
        })}
      </ul>
      <div>
        <p>610</p>
        <CurrencyIcon />
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}
