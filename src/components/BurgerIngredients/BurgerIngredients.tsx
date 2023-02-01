import React, { memo, useMemo, useState} from "react";
import mainStyle from "./BurgerIngredients.module.css";
import tabStyle from "./Tab/Tab.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../services/hooks";
import Ingredient from "./Ingredient/Ingredient";
import { v4 as uuidv4 } from "uuid";
import { INewElem } from "../../services/types/data";

function BurgerIngredients() {
  const [current, setCurrent] = useState("bun");
  const handleClick = (evt: string) => {
    setCurrent(evt);
  };
  const data = useSelector((store) => store.item.burgerData);

  const [state, setState] = useState({ overlay: false, ingredient: {} });

  const resultBun = useMemo(
    () => data.filter((element) => element.type === "bun"),
    [data]
  );
  const resultMain = useMemo(
    () => data.filter((element) => element.type === "main"),
    [data]
  );
  const resultSauce = useMemo(
    () => data.filter((element) => element.type === "sauce"),
    [data]
  );

  const openModal = (item: INewElem) => {
    setState({ ...state, overlay: true, ingredient: item });
  };
  const ingridietScroll = (evt: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const scroll = evt.currentTarget.scrollTop;
    scroll <= 260
      ? setCurrent("bun")
      : scroll <= 1200
      ? setCurrent("sauce")
      : setCurrent("main");
  };
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
          <Tab value="main" active={current === "main"} onClick={handleClick}>
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
          </section>
        </div>
      </section>
    </>
  );
}

export default memo(BurgerIngredients);
