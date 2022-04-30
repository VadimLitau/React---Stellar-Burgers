import React, { useContext, useState } from "react";
import ConstructorStyle from "./BurgerConstructor.module.css";
import {
  Button,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import OrderDetails from "../Modal/OrderDetails/OrderDetails";
import { checkResponse } from "../../utils/constants";
import { baseUrl } from "../../utils/constants";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DataContext, HandleContext } from "../../services/productsContext";
import { useDispatch, useSelector } from "react-redux";
import {
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL,
  ORDER_FAIL,
} from "../../services/actions";
/*Достаточно долго ломал голову, не понимаю как в моей реализации кода, проверить входящие данные, т.к они приходят после работы с .filter и опционно возвращаются массивом
Проверка через стандртное .propTypes не дает необходимого результата. Допускаю что я неправильно реализовал сам BurgerConstructor*/
export default function BurgerConstructor() {
  const state = useSelector((store) => store);
  const orderOverlay = state.item.overlay;
  const dispatch = useDispatch();

  const setOrder = state.item.setOrder;
  const [testNumber, setState] = useState({
    overlay: false,
    isLoading: false,
    hasError: false,
  });

  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };
  const data = state.item.burgerData;
  const bun = state.item.burgerData.filter((element) => element.type === "bun");
  const orderPrice = [];
  const orderId = [];
  const setOrderPrice = () => {
    return orderPrice.reduce((sum, current) => sum + current, 0);
    /*Да, я понимаю что это нужно сделать через state, но без d&d мне делать это лень =) */
  };
  const getOrder = () => {
    getServOrder();
  };
  const getServOrder = async () => {
    dispatch({ type: OPEN_ORDER_MODAL, hasError: false, isLoading: true });
    await fetch(`${baseUrl}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ ingredients: orderId }),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch({ type: OPEN_ORDER_MODAL, isLoading: false });
        setState({
          ...testNumber,
          order: data.order.number,
        });
      })
      .catch((err) => dispatch({ type: ORDER_FAIL }));
  };
  return (
    <section className={`${ConstructorStyle.head} ml-10`}>
      <ul className={`${ConstructorStyle.list} mt-25`}>
        {bun.map((item) => {
          if (item._id === "60d3b41abdacab0026a733c6") {
            orderPrice.push(item.price);
            orderId.push(item._id);
            return (
              <li key={item._id} className={`${ConstructorStyle.element} pr-4`}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${item.name} (верх)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          }
        })}
      </ul>

      <ul
        className={`${ConstructorStyle.list} ${ConstructorStyle.element_scroll} ml-4 mr-4`}
      >
        {data.map((item) => {
          if (item.type != "bun") {
            //dispatch({ type: CLOSE_ORDER_MODAL, orderPrice: item.price, orderId: item.orderId })
            orderPrice.push(item.price);
            orderId.push(item._id);
            return (
              <li
                key={item._id}
                className={`${ConstructorStyle.element}  mb-4 pr-2`}
              >
                <span className={`mr-2`}>
                  <DragIcon />
                </span>
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          }
        })}
      </ul>
      <ul className={`${ConstructorStyle.list} mb-10`}>
        {bun.map((item) => {
          if (item._id === "60d3b41abdacab0026a733c6") {
            orderPrice.push(item.price);
            orderId.push(item._id);
            return (
              <li key={item._id} className={`${ConstructorStyle.element} pr-4`}>
                <ConstructorElement
                  type="bottom"
                  isLocked={true}
                  text={`${item.name} (низ)`}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            );
          }
        })}
      </ul>
      <div className={`${ConstructorStyle.sell} mr-4 mb-10`}>
        <p className={`text text_type_digits-medium mr-3`}>{setOrderPrice()}</p>
        <div className={`${ConstructorStyle.logo} pr-10`}>
          <CurrencyIcon />
        </div>
        {orderOverlay && (
          <Modal closeModal={closeModal} title={""}>
            {state.item.isLoading && "Загрузка..."}
            {state.item.hasError && "Произошла ошибка"}
            {!state.item.isLoading && !state.item.hasError && (
              <OrderDetails orderNumber={testNumber.order} />
            )}
          </Modal>
        )}
        <Button type="primary" size="large" onClick={getOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
//
