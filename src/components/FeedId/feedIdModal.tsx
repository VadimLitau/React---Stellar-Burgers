import React from "react";
import feedIdStyle from "./feedId.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";

import { useSelector } from "../../services/hooks";
import { IFeedItem, IIngr } from "../../services/types/data";
export default function FeedIdModal() {
  const { id } = useParams<{ id: string }>();

  const burgerData = useSelector((store) => store.item.burgerData);

  const dataFeed = useSelector((store) => store.ws.messages);

  let price: number = 0;
  interface Iinfo {
    data: IFeedItem | null;
    ingredientForModal: IFeedItem | undefined;
    ingredientForModalStatus: string | undefined;
    ingredientForModalCreatedAt: string | undefined;
    ingredientForModalIngredients: any[] | undefined;
    itemDay: string;
    now: Date;
    ingrArr: IIngr[] | never;
  }
  const info: Iinfo = {
    data: null,
    ingredientForModal: undefined,
    ingredientForModalStatus: undefined,
    ingredientForModalCreatedAt: "",
    ingredientForModalIngredients: [],
    itemDay: "",
    now: new Date(),
    ingrArr: [],
  };

  let color = {
    color: "#00CCCC",
    name: "",
  };

  if (dataFeed.length > 0) {
    info.data = dataFeed[`${dataFeed.length - 1}`].orders;
    //console.log(info.data);

    info.ingredientForModal = info.data?.find(
      (ingr: { _id: string }) => ingr._id === id
    );

    info.ingredientForModalStatus = info.ingredientForModal?.status;

    info.ingredientForModalCreatedAt = info.ingredientForModal?.createdAt;
    info.ingredientForModalIngredients = info.ingredientForModal?.ingredients;
  }
  if (info.ingredientForModalStatus === "done") {
    color.color = "#00CCCC";
    color.name = "Выполнен";
  } else if (info.ingredientForModalStatus === "pending") {
    color.color = "#B22222";
    color.name = "Отменен";
  } else {
    color.color = "#F2F2F3";
    color.name = "Готовится";
  }
  //Цыганская магия
  const test = info.ingredientForModalIngredients?.reduce(function (acc, el) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, []);

  const sum = burgerData.map((el) => {
    const data = info.ingredientForModalIngredients?.find(
      (item) => el._id === item
    );

    if (data) {
      info.ingrArr.push(el);
    }
  }, 0);

  info.ingrArr.forEach((item) => {
    price += test[item._id] * item.price;
  });

  const time: string = info.ingredientForModalCreatedAt || "";
  const nowDay = info.now.getDate();
  const findT = time.indexOf("T");
  const findDay = time.slice(findT - 2, findT);
  const findTime = time.slice(findT + 1, findT + 6);

  nowDay.toString() === findDay
    ? (info.itemDay = "Cегодня")
    : Number(nowDay) - Number(findDay) === 1
    ? (info.itemDay = "Вчера")
    : Number(nowDay) - Number(findDay) === 2
    ? (info.itemDay = "2 дня назад")
    : (info.itemDay = "Архивный заказ");
  //console.log(info.ingredientForModal);
  return (
    <>
      {!info.ingredientForModal && (
        <div className={feedIdStyle.loadingWrap}>
          <h1 className={`${feedIdStyle.loading} text text_type_main-large`}>
            Загрузка
          </h1>
        </div>
      )}
      {info.ingredientForModal && (
        <section className={feedIdStyle.page}>
          <div className="pl-8 pr-8">
            <h1
              className={`${feedIdStyle.feedNum} text text_type_digits-default mb-10`}
            >
              {`#${info.ingredientForModal.number}`}
            </h1>
            <p
              className={`${feedIdStyle.name} text text_type_main-medium mb-3`}
            >
              {info.ingredientForModal.name}
            </p>
            <p className={`text text_type_main-default mb-15`} style={color}>
              {color.name}
            </p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div>
              <ul className={`${feedIdStyle.list} pr-6 mb-10`}>
                {info.ingrArr.map((item) => {
                  //console.log(item._id);
                  return (
                    <li
                      className={`${feedIdStyle.listItem} pb-4`}
                      key={item._id}
                    >
                      <div className={feedIdStyle.listItemWrap}>
                        <div className={feedIdStyle.listItemWrap}>
                          <img
                            src={item.image_mobile}
                            alt="testImage"
                            className={feedIdStyle.image}
                          />
                          <p className="pl-4 text text_type_main-default">
                            {item.name}
                          </p>
                        </div>
                        <div className={feedIdStyle.listItemWrap}>
                          <p className="text text_type_digits-default pl-4">
                            {test[item._id]}&nbsp;x&nbsp;{item.price}
                          </p>
                          <CurrencyIcon type="primary" />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`${feedIdStyle.price} ${feedIdStyle.priceWrap}`}>
              <p className="text text_type_main-default text_color_inactive">
                {info.itemDay + " "}
                {findTime + " i-GMT+3"}
              </p>
              <div className={`${feedIdStyle.price}`}>
                <p className="text text_type_digits-default">{price}</p>{" "}
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
