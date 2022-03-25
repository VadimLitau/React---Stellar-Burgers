import React from "react";
import { useEffect, useState } from "react";
import { burgerDataUrl, ingredientsPropTypes } from "../../utils/constants.js";
import mainStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
export const bun = "";
/*Ситуация аналогичная как и в BurgerConstructor */
function App() {
  const [state, setState] = useState({
    burgerData: [],
    isLoading: false,
    hasError: false,
  });

  useEffect(() => {
    const getBurgerData = async () => {
      try {
        setState({ ...state, isLoading: true, hasError: false });
        const res = await fetch(burgerDataUrl);
        const data = await res.json();
        setState({ ...state, burgerData: data.data });
      } catch (err) {
        console.log("Ошибка загрузки данных", err.message);
        setState({ ...state, isLoading: false, hasError: true });
      }
    };
    getBurgerData();
  }, []);

  const bun = state.burgerData.filter((element) => element.type === "bun");
  const main = state.burgerData.filter((element) => element.type === "main");
  const sauce = state.burgerData.filter((element) => element.type === "sauce");

  return (
    <section className={mainStyle.page}>
      <AppHeader />
      <main className={mainStyle.content}>
        <BurgerIngredients main={main} sauce={sauce} bun={bun} />
        <BurgerConstructor data={state.burgerData} />
      </main>
    </section>
  );
}

export default App;
