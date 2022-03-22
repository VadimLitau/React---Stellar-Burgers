import React from "react";
import mainStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import { BurgersData } from "../../utils/data.js";

const bun = BurgersData.filter((element) => element.type === "bun");
const main = BurgersData.filter((element) => element.type === "main");
const sauce = BurgersData.filter((element) => element.type === "sauce");
console.log(bun);

function App() {
  return (
    <>
      <section className={mainStyle.page}>
        <AppHeader />
        <BurgerIngredients main={main} sauce={sauce} bun={bun} />
      </section>
    </>
  );
}

export default App;
