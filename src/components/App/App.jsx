import React from "react";
import { useEffect, useState, useContext } from "react";
import { baseUrl, checkResponse } from "../../utils/constants.js";
import mainStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import IngredientDetails from "../Modal/IngridientDetails/IngridientDetails";
import { DataContext, HandleContext } from "../../services/productsContext.js";
import Test from "../Test/Test";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
/*Ситуация аналогичная как и в BurgerConstructor */
function App() {
  // const [state, setState] = useState({
  //   burgerData: [],
  //   isLoading: false,
  //   hasError: false,
  // });

  //Состояние попапов
  // const [isOrder, setOrder] = useState(false);

  // const closeModals = () => {
  //   setOrder(false);
  //   setIngredient(null);
  // };

  //Состояние выбора ингредиента
  //const [currentItem, setIngredient] = useState(null);
  /*
  useEffect(() => {
    const getBurgerData = async () => {
      try {
        setState({ ...state, isLoading: true, hasError: false });
        fetch(`${baseUrl}` + "ingredients")
          .then(checkResponse)
          .then((data) => {
            setState({ ...state, burgerData: data.data });
          });
      } catch (err) {
        console.log("Ошибка загрузки данных", err.message);
        setState({ ...state, isLoading: false, hasError: true });
      }
    };
    getBurgerData();
  }, []);
  */
  return (
    <section className={mainStyle.page}>
      <AppHeader />
      <main className={mainStyle.content}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </section>
  );
}

export default App;
