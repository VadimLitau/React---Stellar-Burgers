import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedItemStyle from "./feedItem.module.css";
import { useLocation, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";
export function FeedItemImage({ data, number, lengthArr }) {
  let count = lengthArr - number;
  return (
    <>
      {number && (
        <div
          className={
            count <= 5 ? feedItemStyle.images : feedItemStyle.imagesTest
          }
        >
          <div
            className={
              count < 5 ? feedItemStyle.image : feedItemStyle.imageTest
            }
          >
            <img
              src={data.image_mobile}
              alt="Фото ингридиента"
              className={feedItemStyle.imageMobile}
            />
          </div>
          {count === 5 && (
            <div className={feedItemStyle.countWrap}>
              <div
                className={`${feedItemStyle.count} text text_type_main-default`}
              >
                <p className="pl-1">{`+${lengthArr - 6}`}</p>
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
export default function FeedItem(item) {
  const location = useLocation();
  const burgerData = useSelector((store) => store.item.burgerData);
  const ingredients = item.item.ingredients;
  const info = {
    ingrArr: [],
    itemDay: "",
    time: item.item.createdAt,
    now: new Date(),
    id: item.item._id,
    profileUrl: item.profile,
    url: "",
  };

  let price = 0;
  let countImage = 0;

  const nowDay = info.now.getDate();
  const findT = info.time.indexOf("T");
  const findDay = info.time.slice(findT - 2, findT);
  const findTime = info.time.slice(findT + 1, findT + 6);

  const sum = burgerData.map((el) => {
    const data = ingredients.find((item) => el._id === item);
    if (data) {
      info.ingrArr.push(el);
    }
  }, 0);

  nowDay.toString() === findDay
    ? (info.itemDay = "Cегодня")
    : Number(nowDay) - Number(findDay) === 1
    ? (info.itemDay = "Вчера")
    : Number(nowDay) - Number(findDay) === 2
    ? (info.itemDay = "2 дня назад")
    : (info.itemDay = "Архивный заказ");

  info.profileUrl === "true"
    ? (info.url = `/profile/order/${info.id}`)
    : (info.url = `/feed/${info.id}`);

  return (
    <Link
      to={{
        pathname: info.url,
        state: { background: location },
      }}
      key={info.id}
      className={feedItemStyle.link}
    >
      <li className={feedItemStyle.listItem} key={info.id}>
        <div className={feedItemStyle.element}>
          <div className={feedItemStyle.wrap}>
            <p className="pt-6 text text_type_digits-default">
              #{item.item.number}
            </p>
            <p
              className={`${feedItemStyle.date} text text_type_main-default text_color_inactive`}
            >
              {info.itemDay + " "}
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
              {info.ingrArr.reverse().map((item) => {
                price += item.price;
                if (info.ingrArr.length <= 6) {
                  return <FeedItemImage data={item} key={item._id} />;
                } else {
                  return (
                    <FeedItemImage
                      data={item}
                      key={item._id}
                      number={(countImage += 1)}
                      lengthArr={info.ingrArr.length}
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

FeedItem.propTypes = {
  item: PropTypes.object.isRequired,
};

FeedItemImage.propTypes = {
  data: PropTypes.object.isRequired,
  number: PropTypes.number,
  lengthArr: PropTypes.number,
};
