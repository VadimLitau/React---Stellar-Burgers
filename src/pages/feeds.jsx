import React, { useState } from "react";
import mainStyle from "./main.module.css";
import catImg from "../images/catImg.jpg";
export default function Feeds() {
  return (
    <>
      <section className={mainStyle.content}>
        <div className={mainStyle.content_feeds}>
          <p className="mt-10 text text_type_main-medium">
            Когда ни будь, тут обязательно появятся ваши заказы. Пока что
            предлагаю полюбоваться на котиков.
          </p>
          <img src={catImg} alt="Котята котлетята" className={mainStyle.img} />
        </div>
      </section>
    </>
  );
}
