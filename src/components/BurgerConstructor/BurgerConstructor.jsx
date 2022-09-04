import React from "react";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { addIngredient } from "../../services/actions";
import {
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  ADD_ITEM,
} from "../../services/constants/index";
import { useDrop } from "react-dnd";
import { getServOrder } from "../../services/actions/index";
import ChangeItem from "./ChangeItem/ChangeItem";
import { useHistory } from "react-router-dom";

export function ModalLoading({ load, error }) {
  return (
    <>
      {load && (
        <div className={ConstructorStyle.loadingWrap}>
          <h1
            className={`${ConstructorStyle.loading} text text_type_main-large`}
          >
            Загрузка
          </h1>
        </div>
      )}
      {error && (
        <div className={ConstructorStyle.loadingWrap}>
          <h1
            className={`${ConstructorStyle.loading} text text_type_main-large`}
          >
            Произошла ошибка
          </h1>
        </div>
      )}
    </>
  );
}

export default function BurgerConstructor() {
  const history = useHistory();
  const state = useSelector((store) => store);
  const burgerConstructorItems = useSelector(
    (store) => store.item.burgerConstructorItems
  );
  const authUser = useSelector((store) => store.route.userAuthorizationSuccess);
  const orderOverlay = state.item.overlay;
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };

  const bun = state.item.bun;
  const bunArr = [bun].map((item) => item.id);
  const burgerConstructorItemsArr = burgerConstructorItems.map(
    (item) => item.id
  );
  const orderId = [...bunArr, ...burgerConstructorItemsArr];
  const setOrderPrice = () => {
    return burgerConstructorItems.reduce(
      (sum, current) => sum + current.price,
      0 + bun.price ? bun.price * 2 : 0
    );
  };

  const getOrder = () => {
    if (!authUser) {
      console.log(!authUser);
      return history.replace("/login");
    } else {
      dispatch(getServOrder(orderId));
      dispatch({ type: OPEN_ORDER_MODAL });
    }
  };
  const handleDrop = (itemId) => {
    dispatch({
      type: ADD_ITEM,
      item: { ...itemId }, //теперь при каждой новой отрисовке ингридиентов конструктора их ключ, не меняется
    });
  };
  const [{ isHover }, dropTarget] = useDrop({
    accept: "item",
    drop(itemId) {
      //console.log(itemId);
      handleDrop(addIngredient(itemId));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  return (
    <section className={`${ConstructorStyle.head} ml-10`} ref={dropTarget}>
      <ul className={`${ConstructorStyle.list} mt-25`}>
        {bun.src && (
          <li key={bun._id} className={`${ConstructorStyle.element} pr-4`}>
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.src}
            />
          </li>
        )}
      </ul>

      <ul
        className={`${ConstructorStyle.list} ${ConstructorStyle.element_scroll} ml-4 mr-4`}
      >
        {!burgerConstructorItems[0] && (
          <p
            className={`${ConstructorStyle.element_text} mb-4 pr-2 text text_type_main-large mt-10 mb-5`}
          >
            Соберите свой бургер
          </p>
        )}
        {burgerConstructorItems.map((item, index) => (
          <ChangeItem item={item} index={index} key={item.key}></ChangeItem>
        ))}
      </ul>
      <ul className={`${ConstructorStyle.list} mb-10`}>
        {bun.name && (
          <li key={bun._id} className={`${ConstructorStyle.element} pr-4`}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.src}
            />
          </li>
        )}
      </ul>
      <div className={`${ConstructorStyle.sell} mr-4 mb-10`}>
        <p className={`text text_type_digits-medium mr-3`}>{setOrderPrice()}</p>
        <div className={`${ConstructorStyle.logo} pr-10`}>
          <CurrencyIcon />
        </div>
        {orderOverlay && (
          <Modal closeModal={closeModal} title={""}>
            {state.item.servOrderRequest && <ModalLoading load={true} />}
            {state.item.servOrderFailed && <ModalLoading error={true} />}
            {!state.item.servOrderRequest && !state.item.servOrderFailed && (
              <OrderDetails orderNumber={state.item.servOrder} />
            )}
          </Modal>
        )}
        <Button
          type="primary"
          size="large"
          onClick={getOrder}
          disabled={bun.price && burgerConstructorItems.length ? false : true}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
