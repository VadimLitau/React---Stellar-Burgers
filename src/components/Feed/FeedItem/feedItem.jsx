import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedItemStyle from "./feedItem.module.css";
import { useLocation, Link } from "react-router-dom";
export function FeedItemImage({ data, number, length }) {
  // console.log(test);
  let test = length - number;
  //console.log(test);
  return (
    <>
      {number && (
        <div
          className={
            test <= 5 ? feedItemStyle.images : feedItemStyle.imagesTest
          }
        >
          <div
            className={test < 5 ? feedItemStyle.image : feedItemStyle.imageTest}
          >
            <img
              src={data.image_mobile}
              alt="Фото ингридиента"
              className={feedItemStyle.imageMobile}
            />
          </div>
          {test === 5 && (
            <div className={feedItemStyle.countWrap}>
              <div
                className={`${feedItemStyle.count} text text_type_main-default`}
              >
                <p className="pl-1">{`+${length - 6}`}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {!number && (
        <div className={feedItemStyle.images}>
          <div className={feedItemStyle.image}>
            <img
              src={data.image_mobile}
              alt="Фото ингридиента"
              className={feedItemStyle.imageMobile}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default function FeedItem(item, key, profile) {
  //console.log(item.profile);
  const location = useLocation();
  const burgerData = useSelector((store) => store.item.burgerData);
  const ingredients = item.item.ingredients;

  let test = [];
  const sum = burgerData.map((el) => {
    const data = ingredients.find((item) => el._id === item);
    if (data) {
      test.push(el);
    }
  }, 0);
  let itemDay = "";
  let time = item.item.createdAt;
  let now = new Date();
  let nowDay = now.getDate();
  let findT = time.indexOf("T");
  let findDay = time.slice(findT - 2, findT);
  let findTime = time.slice(findT + 1, findT + 6);
  let id = item.item._id;
  if (nowDay.toString() === findDay) {
    itemDay = "Cегодня";
  } else if (Number(nowDay) - Number(findDay) === 1) {
    itemDay = "Вчера";
  } else if (Number(nowDay) - Number(findDay) === 2) {
    itemDay = "2 дня назад";
  } else {
    itemDay = "Архивный заказ";
  }

  let price = 0;
  let countImage = 0;

  let ttt = item.profile;
  let url = "";
  ttt === "true" ? (url = `/profile/order/${id}`) : (url = `/feed/${id}`);
  // console.log(ttt);
  return (
    <Link
      to={{
        pathname: url,
        state: { background: location },
      }}
      key={id}
      className={feedItemStyle.link}
    >
      <li className={feedItemStyle.listItem} key={key}>
        <div className={feedItemStyle.element}>
          <div className={feedItemStyle.wrap}>
            <p className="pt-6 text text_type_digits-default">
              #{item.item.number}
            </p>
            <p
              className={`${feedItemStyle.date} text text_type_main-default text_color_inactive`}
            >
              {itemDay + " "}
              {findTime + " i-GMT+3"}
            </p>
          </div>
          <p
            className={`${feedItemStyle.name} pt-6 pb-6 text text_type_main-medium`}
          >
            {item.item.name}
          </p>
          <div className={feedItemStyle.wrapPrice}>
            <div className={feedItemStyle.price}>
              {test.reverse().map((item) => {
                price += item.price;
                //return <FeedItemImage data={item} key={item._id} />;
                if (test.length <= 6) {
                  return <FeedItemImage data={item} key={item._id} />;
                } else {
                  return (
                    <FeedItemImage
                      data={item}
                      key={item._id}
                      number={(countImage += 1)}
                      length={test.length}
                    />
                  );
                }
              })}
            </div>
            <div className={feedItemStyle.wrapPrice}>
              <p className="text text_type_digits-default pr-2">{price}</p>
              <CurrencyIcon />
            </div>
          </div>
        </div>
      </li>
    </Link>
  );
}
