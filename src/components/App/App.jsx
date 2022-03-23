import React from "react";
import mainStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.jsx";
import { bun, main, sauce } from "../../utils/data.js";

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
