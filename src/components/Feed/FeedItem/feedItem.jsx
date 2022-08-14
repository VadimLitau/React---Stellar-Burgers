import React, { useState } from "react";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import feedItemStyle from "./feedItem.module.css";
import testImage from "../../../images/test/core.png";
export function FeedItemImage() {
  return (
    <div className={feedItemStyle.images}>
      <div className={`${feedItemStyle.imageHead} ${feedItemStyle.image}`}>
        <img src={testImage} alt="Фото ингридиента" />
      </div>
      <div className={`${feedItemStyle.image1} ${feedItemStyle.image}`}>
        <img src={testImage} alt="Фото ингридиента" />
      </div>
      <div className={`${feedItemStyle.image2} ${feedItemStyle.image}`}>
        <img src={testImage} alt="Фото ингридиента" />
      </div>
      <div className={`${feedItemStyle.image3} ${feedItemStyle.image}`}>
        <img src={testImage} alt="Фото ингридиента" />
      </div>
      <div className={`${feedItemStyle.image4} ${feedItemStyle.image}`}>
        <img src={testImage} alt="Фото ингридиента" />
      </div>
      <div className={`${feedItemStyle.image5} ${feedItemStyle.image}`}>
        <img src={testImage} alt="Фото ингридиента" />
      </div>
      <div className={`${feedItemStyle.image6} ${feedItemStyle.image}`}>
        <img src={testImage} alt="Фото ингридиента" />
      </div>
    </div>
  );
}
export default function FeedItem() {
  return (
    <div className={feedItemStyle.element}>
      <div className={feedItemStyle.wrap}>
        <p className="pt-6 text text_type_digits-default">#034535</p>
        <p
          className={`${feedItemStyle.date} text text_type_main-default text_color_inactive`}
        >
          Сегодня, 16:20 i-GMT+3
        </p>
      </div>
      <p className="pt-6 pb-6 text text_type_main-medium">
        Death Star Starship Main бургер
      </p>
      <div className={`${feedItemStyle.wrapImage}`}>
        <div></div>
        <div className={feedItemStyle.price}>
          <FeedItemImage />
          <p className="text text_type_digits-default pr-2">480</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
}
