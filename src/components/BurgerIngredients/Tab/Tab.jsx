import React from "react";
import tabStyle from "./Tab.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs() {
  const [current, setCurrent] = React.useState("one");
  const handleClick = (evt) => {
    setCurrent(evt);
  };
  return (
    <div className={tabStyle.tab}>
      <Tab value="one" active={current === "one"} onClick={handleClick}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={handleClick}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={handleClick}>
        Начинки
      </Tab>
    </div>
  );
}
