import React from "react";
import mainStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { bun, main, sauce } from "../../utils/data.js";
/*Ситуация аналогичная как и в BurgerConstructor */
function App() {
  return (
    <section className={mainStyle.page}>
      <AppHeader />
      <main className={mainStyle.content}>
        <BurgerIngredients main={main} sauce={sauce} bun={bun} />
        <BurgerConstructor />
      </main>
    </section>
  );
}

export default App;
