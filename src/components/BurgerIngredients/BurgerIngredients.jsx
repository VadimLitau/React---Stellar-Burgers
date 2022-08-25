import React, { useState, useEffect } from "react";
import mainStyle from "./BurgerIngredients.module.css";
import tabStyle from "./Tab/Tab.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";
import Ingredient from "./Ingredient/Ingredient";
import Modal from "../Modal/Modal";
import IngredientDetails from "../Modal/IngridientDetails/IngridientDetails";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { getApiBurgerData } from "../../services/actions";
import { useLocation, Link } from "react-router-dom";

function BurgerIngredients() {
  // console.log(BurgerIngredients)
  const [current, setCurrent] = useState("bun");
  const handleClick = (evt) => {
    setCurrent(evt);
  };
  const data = useSelector((store) => store.item.burgerData);

  // const bun = data.filter((element) => element.type === "bun");
  // const main = data.filter((element) => element.type === "main");
  // const sauce = data.filter((element) => element.type === "sauce");
  const [state, setState] = useState({ overlay: false });
  const closeModals = () => {
    setState({ ...state, overlay: false });
  };
  const resultBun = React.useMemo(
    () => data.filter((element) => element.type === "bun"),
    [data]
  );
  const resultMain = React.useMemo(
    () => data.filter((element) => element.type === "main"),
    [data]
  );
  const resultSauce = React.useMemo(
    () => data.filter((element) => element.type === "sauce"),
    [data]
  );

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   document.title = "react burger";
  //   dispatch(getApiBurgerData());
  // }, [dispatch]);

  const openModal = (item) => {
    setState({ ...state, overlay: true, ingredient: item });
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
  //console.log(location)
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
          <section className={mainStyle.headIngridient}>
            <p className={`text text_type_main-medium mt-10`}>Булки</p>
            <ul className={`${mainStyle.itemIngridient} ml-4 mr-4`}>
              {resultBun.map((item) => (
                //   <Link to={{
                //     pathname: `/ingredients/${item._id}`,
                //     state: {background: location}
                // }}
                // >

                <Ingredient
                  type={item.type}
                  count={item.count}
                  id={item._id}
                  name={item.name}
                  key={item._id}
                  src={item.image}
                  price={item.price}
                  onCardClick={() => openModal(item)}
                />
              ))}
            </ul>
          </section>
          <section className={mainStyle.headIngridient}>
            <p className={`text text_type_main-medium mt-10`}>Начинки</p>
            <ul className={`${mainStyle.itemIngridient} ml-4 mr-4`}>
              {resultMain.map((item) => (
                <Ingredient
                  index={uuidv4()}
                  type={item.type}
                  count={item.count}
                  id={item._id}
                  name={item.name}
                  key={item._id}
                  src={item.image}
                  price={item.price}
                  onCardClick={() => openModal(item)}
                />
              ))}
            </ul>
          </section>
          <section className={mainStyle.headIngridient}>
            <p className={`text text_type_main-medium mt-10`}>Соусы</p>
            <ul className={`${mainStyle.itemIngridient} ml-4 mr-4`}>
              {resultSauce.map((item) => (
                <Ingredient
                  index={uuidv4()}
                  type={item.type}
                  count={item.count}
                  id={item._id}
                  name={item.name}
                  key={item._id}
                  src={item.image}
                  price={item.price}
                  onCardClick={() => openModal(item)}
                />
              ))}
            </ul>
            {/* {state.overlay && (
              <Modal closeModal={closeModals} title={"Детали заказа"}>
                <IngredientDetails ingredient={state.ingredient} />
              </Modal>
            )} */}
          </section>
        </div>
      </section>
    </>
  );
}

export default React.memo(BurgerIngredients);
