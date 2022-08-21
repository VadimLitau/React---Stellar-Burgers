import React, { useEffect } from "react";
import feedIdStyle from "./feedId.module.css";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function FeedIdModal() {
  const { id } = useParams();
  const burgerData = useSelector((store) => store.item.burgerData);
  const dataFeed = useSelector((store) => store.ws.messages);
  let data = null;
  let ingredientForModal = null;
  let ingredientForModalStatus = null;
  let ingredientForModalCreatedAt = "";
  let ingredientForModalIngredients = [];

  if (dataFeed.length > 0) {
    data = dataFeed[`${dataFeed.length - 1}`].orders;
    ingredientForModal = data.find((ingr) => ingr._id === id);
    ingredientForModalStatus = ingredientForModal.status;
    ingredientForModalCreatedAt = ingredientForModal.createdAt;
    ingredientForModalIngredients = ingredientForModal.ingredients;
  }
  let color = {
    color: "#00CCCC",
    name: "",
  };
  if (ingredientForModalStatus === "done") {
    color.color = "#00CCCC";
    color.name = "Выполнен";
  } else if (ingredientForModalStatus === "pending") {
    color.color = "#B22222";
    color.name = "Отменен";
  } else {
    color.color = "#F2F2F3";
    color.name = "Готовится";
  }

  let itemDay = "";
  let time = ingredientForModalCreatedAt;
  let now = new Date();
  let nowDay = now.getDate();
  let findT = time.indexOf("T");
  let findDay = time.slice(findT - 2, findT);
  let findTime = time.slice(findT + 1, findT + 6);
  if (nowDay.toString() === findDay) {
    itemDay = "Cегодня";
  } else if (Number(nowDay) - Number(findDay) === 1) {
    itemDay = "Вчера";
  } else if (Number(nowDay) - Number(findDay) === 2) {
    itemDay = "2 дня назад";
  } else {
    itemDay = "Архивный заказ";
  }
  let test = [];
  const sum = burgerData.map((el) => {
    const data = ingredientForModalIngredients.find((item) => el._id === item);
    if (data) {
      test.push(el);
    }
  }, 0);
  let price = 0;
  test.forEach((item) => {
    price += item.price;
  });
  return (
    <>
      {!ingredientForModal && (
        <div className={feedIdStyle.loadingWrap}>
          <h1 className={`${feedIdStyle.loading} text text_type_main-large`}>
            Загрузка
          </h1>
        </div>
      )}
      {ingredientForModal && (
        <section className={feedIdStyle.page}>
          <div className="pl-8 pr-8">
            <h1
              className={`${feedIdStyle.feedNum} text text_type_digits-default mb-10`}
            >
              {`#${ingredientForModal.number}`}
            </h1>
            <p
              className={`${feedIdStyle.name} text text_type_main-medium mb-3`}
            >
              {ingredientForModal.name}
            </p>
            <p className={`text text_type_main-default mb-15`} style={color}>
              {color.name}
            </p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <div>
              <ul className={`${feedIdStyle.list} pr-6 mb-10`}>
                {test.map((item) => {
                  return (
                    <li
                      className={`${feedIdStyle.listItem} pb-4`}
                      key={uuidv4()}
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
                            1&nbsp;x&nbsp;{item.price}
                          </p>
                          <CurrencyIcon />
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={`${feedIdStyle.price} ${feedIdStyle.priceWrap}`}>
              <p className="text text_type_main-default text_color_inactive">
                {itemDay + " "}
                {findTime + " i-GMT+3"}
              </p>
              <div className={`${feedIdStyle.price}`}>
                <p className="text text_type_digits-default">{price}</p>{" "}
                <CurrencyIcon />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
