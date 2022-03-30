import React from "react";
import { useEffect, useState } from "react";
import { burgerDataUrl } from "../../utils/constants.js";
import mainStyle from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import IngredientDetails from "../Modal/IngridientDetails/IngridientDetails";
/*Ситуация аналогичная как и в BurgerConstructor */
function App() {
  const [state, setState] = useState({
    burgerData: [],
    isLoading: false,
    hasError: false,
  });

  //Состояние попапов
  const [isOrder, setOrder] = useState(false);

  const closeModals = () => {
    setOrder(false);
    setIngredient(null);
  };

  const openOrderModal = () => {
    setOrder(true);
  };

  //Состояние выбора ингредиента
  const [currentItem, setIngredient] = useState(null);

  const handleElement = (elem) => {
    if (elem) {
      setIngredient(elem);
    }
  };
  useEffect(() => {
    const getBurgerData = async () => {
      try {
        setState({ ...state, isLoading: true, hasError: false });
        fetch(`${burgerDataUrl}` + "ingredients")
          .then((res) => res.json())
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

  return (
    <section className={mainStyle.page}>
      <AppHeader />
      <main className={mainStyle.content}>
        <BurgerIngredients
          handleElement={handleElement}
          data={state.burgerData}
        />
        <BurgerConstructor data={state.burgerData} openModal={openOrderModal} />
      </main>
      {isOrder && (
        <Modal closeModal={closeModals} title="">
          <OrderDetails />
        </Modal>
      )}
      {currentItem && (
        <Modal closeModal={closeModals} title="Детали ингредиента">
          <IngredientDetails ingredient={currentItem} />
        </Modal>
      )}
    </section>
  );
}

export default App;
