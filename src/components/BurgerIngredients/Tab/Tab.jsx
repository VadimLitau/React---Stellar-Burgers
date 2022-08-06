import React from "react";
import tabStyle from "./Tab.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs() {
  const [current, setCurrent] = React.useState("bun");
  const handleClick = (evt) => {
    setCurrent(evt);
  };
  return (
    <div className={tabStyle.tab}>
      <Tab value="bun" active={current === "bun"} onClick={handleClick}>
        Булки
      </Tab>
      <Tab value="main" active={current === "main"} onClick={handleClick}>
        Соусы
      </Tab>
      <Tab value="sauce" active={current === "sauce"} onClick={handleClick}>
        Начинки
      </Tab>
    </div>
  );
}
