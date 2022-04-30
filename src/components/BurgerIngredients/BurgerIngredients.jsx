import React, { useContext, useState, useEffect } from "react";
import mainStyle from "./BurgerIngredients.module.css";
import Tabs from "./Tab/Tab";
import IngridientsList from "./IngredientsList/IngredientsList";
import tabStyle from "./Tab/Tab.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import List from "./IngredientsList/IngredientsList.module.css";
import Ingredient from "./Ingredient/Ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngridientDetails/IngridientDetails";
export default function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const handleClick = (evt) => {
    setCurrent(evt);
  };

  const data = useSelector((store) => store.item.burgerData);
  const [state, setState] = useState({ overlay: false });
  //console.log(data);

  const bun = data.filter((element) => element.type === "bun");
  const main = data.filter((element) => element.type === "main");
  const sauce = data.filter((element) => element.type === "sauce");

  const openModal = (item) => {
    setState({ ...state, overlay: true, ingredient: item });
    //console.log(state.ingredient);
  };

  const closeModals = () => {
    setState({ ...state, overlay: false });
  };

  const ingridietScroll = (evt) => {
    const scroll = evt.target.scrollTop;
    scroll <= 260
      ? setCurrent("bun")
      : scroll <= 1200
      ? setCurrent("sauce")
      : setCurrent("main");
  };
  /*на мой взггляд это очень топорное решение, привязанное к конкретному кол-ву элементов. Увы, подругому я не смог =(*/

  return (
    <>
      <section className={mainStyle.head}>
        <h1 className={`text text_type_main-large mt-10 mb-5`}>
          Соберите бургер
        </h1>
        <div className={tabStyle.tab}>
          <Tab value="bun" active={current === "bun"} onClick={handleClick}>
            Булки
          </Tab>
          <Tab
            value="main"
            active={current === "main"}
            onClick={handleClick}
            to="normal"
          >
            Соусы
          </Tab>
          <Tab value="sauce" active={current === "sauce"} onClick={handleClick}>
            Начинки
          </Tab>
        </div>
        <div className={mainStyle.list} onScroll={ingridietScroll}>
          <section className={List.head}>
            <p className={`text text_type_main-medium mt-10`}>Булки</p>
            <ul className={`${List.item} ml-4 mr-4`}>
              {bun.map((item) => (
                <Ingredient
                  name={item.name}
                  key={item._id}
                  src={item.image}
                  price={item.price}
                  onCardClick={() =>
                    openModal(item)
                  } /*зараза)))это гениально)Спасибо)ы */
                />
              ))}
            </ul>
          </section>
          <section className={List.head}>
            <p className={`text text_type_main-medium mt-10`}>Начинки</p>
            <ul className={`${List.item} ml-4 mr-4`}>
              {main.map((item) => (
                <Ingredient
                  name={item.name}
                  key={item._id}
                  src={item.image}
                  price={item.price}
                  onCardClick={() =>
                    openModal(item)
                  } /*зараза)))это гениально)Спасибо)ы */
                />
              ))}
            </ul>
          </section>
          <section className={List.head}>
            <p className={`text text_type_main-medium mt-10`}>Соусы</p>
            <ul className={`${List.item} ml-4 mr-4`}>
              {sauce.map((item) => (
                <Ingredient
                  name={item.name}
                  key={item._id}
                  src={item.image}
                  price={item.price}
                  onCardClick={() =>
                    openModal(item)
                  } /*зараза)))это гениально)Спасибо)ы */
                />
              ))}
            </ul>
            {state.overlay && (
              <Modal closeModal={closeModals} title={"Детали заказа"}>
                <IngredientDetails ingredient={state.ingredient} />
              </Modal>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
