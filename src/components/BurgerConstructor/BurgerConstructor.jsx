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
  ADD_ITEM,
  DELETE_ITEM,
} from "../../services/actions";
import { useDrop } from "react-dnd";
import DragAndDropContainer from "../DragAndDropContainer/DragAndDropContainer";
import { v4 as uuidv4 } from "uuid";
import { current } from "@reduxjs/toolkit";
import { getServOrder } from "../../services/actions/index";
/*Достаточно долго ломал голову, не понимаю как в моей реализации кода, проверить входящие данные, т.к они приходят после работы с .filter и опционно возвращаются массивом
Проверка через стандртное .propTypes не дает необходимого результата. Допускаю что я неправильно реализовал сам BurgerConstructor*/
export default function BurgerConstructor() {
  const state = useSelector((store) => store);
  const burgerConstructorItems = useSelector(
    (store) => store.item.burgerConstructorItems
  );
  const orderOverlay = state.item.overlay;
  const dispatch = useDispatch();
  const setOrder = state.item.setOrder;
  // const [testNumber, setState] = useState({
  //   isLoading: false,
  //   hasError: false,
  // });

  const closeModal = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };
  const data = state.item;
  //console.log(data);
  const bun = state.item.bun;
  //console.log(burgerConstructorItems);
  //const orderPrice = [];
  const bunArr = [bun].map((item) => item.id);
  const burgerConstructorItemsArr = burgerConstructorItems.map(
    (item) => item.id
  );
  const orderId = [...bunArr, ...burgerConstructorItemsArr];
  //Опять какая-то ересь, но работает) и вроде даже правильно
  //console.log(orderId);
  const setOrderPrice = () => {
    return burgerConstructorItems.reduce(
      (sum, current) => sum + current.price,
      0 + bun.price ? bun.price * 2 : 0
    );
    /*Да, я понимаю что это нужно сделать через state, но без d&d мне делать это лень =) */
  };

  const getOrder = () => {
    dispatch(getServOrder(orderId));
    dispatch({ type: OPEN_ORDER_MODAL });
  };
  // const getServOrder = async () => {
  //   dispatch({ type: OPEN_ORDER_MODAL, hasError: false, isLoading: true });
  //   await fetch(`${baseUrl}orders`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //     body: JSON.stringify({ ingredients: orderId }),
  //   })
  //     .then(checkResponse)
  //     .then((data) => {
  //       dispatch({ type: OPEN_ORDER_MODAL, isLoading: false });
  //       setState({
  //         ...testNumber,
  //         order: data.order.number,
  //       });
  //     })
  //     .catch((err) => dispatch({ type: ORDER_FAIL }));
  // };
  const handleDrop = (itemId) => {
    dispatch({
      type: ADD_ITEM,
      item: itemId,
    });
  };
  const [{ isHover }, dropTarget] = useDrop({
    accept: "item",
    drop(itemId) {
      handleDrop(itemId);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const deleteElement = (item) => {
    //console.log(item);
    dispatch({
      type: DELETE_ITEM,
      item,
    });
  };

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
        {/* bun.map((item) => {
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
        })}  */}
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
        {burgerConstructorItems.map((item) => (
          <li
            key={uuidv4()}
            className={`${ConstructorStyle.element} mb-4 pr-2`}
          >
            <span className={`mr-2`}>
              <DragIcon />
            </span>
            <ConstructorElement
              index={uuidv4()}
              text={item.name}
              price={item.price}
              thumbnail={item.src}
              handleClose={() => {
                deleteElement(item);
              }}
            />
          </li>
        ))}
        {/* {data.map((item) => {
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
        })} */}
      </ul>
      <ul className={`${ConstructorStyle.list} mb-10`}>
        {
          /* {bun.map((item) => {
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
        })} */
          bun.name && (
            <li key={bun._id} className={`${ConstructorStyle.element} pr-4`}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.src}
              />
            </li>
          )
        }
      </ul>
      <div className={`${ConstructorStyle.sell} mr-4 mb-10`}>
        <p className={`text text_type_digits-medium mr-3`}>{setOrderPrice()}</p>
        <div className={`${ConstructorStyle.logo} pr-10`}>
          <CurrencyIcon />
        </div>
        {orderOverlay && (
          <Modal closeModal={closeModal} title={""}>
            {state.item.servOrderRequest && "Загрузка..."}
            {state.item.servOrderFailed && "Произошла ошибка"}
            {!state.item.servOrderRequest && !state.item.servOrderFailed && (
              <OrderDetails orderNumber={state.item.servOrder} />
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
