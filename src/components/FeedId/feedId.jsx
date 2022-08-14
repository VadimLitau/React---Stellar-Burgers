import React from "react";
import feedIdStyle from "./feedId.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import testImage from "../../images/test/salad.png";
export default function FeedId() {
  const color = {
    color: "#00CCCC",
  };
  return (
    <section className={feedIdStyle.page}>
      <div>
        <h1
          className={`${feedIdStyle.feedNum} text text_type_digits-default mb-10`}
        >
          #034533
        </h1>
        <p className={`text text_type_main-medium mb-3`}>
          Black Hole Singularity острый бургер
        </p>
        <p className={`text text_type_main-default mb-15`} style={color}>
          Выполнен
        </p>
        <p className="text text_type_main-medium mb-6">Состав:</p>
        <div>
          <ul className={`${feedIdStyle.list} pr-6 mb-10`}>
            <li className={`${feedIdStyle.listItem} pb-4`}>
              <div className={feedIdStyle.listItemWrap}>
                <div className={feedIdStyle.listItemWrap}>
                  <img
                    src={testImage}
                    alt="testImage"
                    className={feedIdStyle.image}
                  />
                  <p className="pl-4 text text_type_main-default">
                    Флюоресцентная булка R2-D3
                  </p>
                </div>
                <div className={feedIdStyle.listItemWrap}>
                  <p className="text text_type_digits-default pl-4">2 x 20</p>
                  <CurrencyIcon />
                </div>
              </div>
            </li>
            <li className={`${feedIdStyle.listItem} pb-4`}>
              <div className={feedIdStyle.listItemWrap}>
                <div className={feedIdStyle.listItemWrap}>
                  <img
                    src={testImage}
                    alt="testImage"
                    className={feedIdStyle.image}
                  />
                  <p className="pl-4 text text_type_main-default">
                    Флюоресцентная булка R2-D3
                  </p>
                </div>
                <div className={feedIdStyle.listItemWrap}>
                  <p className="text text_type_digits-default pl-4">2 x 20</p>
                  <CurrencyIcon />
                </div>
              </div>
            </li>
            <li className={`${feedIdStyle.listItem} pb-4`}>
              <div className={feedIdStyle.listItemWrap}>
                <div className={feedIdStyle.listItemWrap}>
                  <img
                    src={testImage}
                    alt="testImage"
                    className={feedIdStyle.image}
                  />
                  <p className="pl-4 text text_type_main-default">
                    Флюоресцентная булка R2-D3
                  </p>
                </div>
                <div className={feedIdStyle.listItemWrap}>
                  <p className="text text_type_digits-default pl-4">2 x 20</p>
                  <CurrencyIcon />
                </div>
              </div>
            </li>
            <li className={`${feedIdStyle.listItem} pb-4`}>
              <div className={feedIdStyle.listItemWrap}>
                <div className={feedIdStyle.listItemWrap}>
                  <img
                    src={testImage}
                    alt="testImage"
                    className={feedIdStyle.image}
                  />
                  <p className="pl-4 text text_type_main-default">
                    Флюоресцентная булка R2-D3
                  </p>
                </div>
                <div className={feedIdStyle.listItemWrap}>
                  <p className="text text_type_digits-default pl-4">2 x 20</p>
                  <CurrencyIcon />
                </div>
              </div>
            </li>
            <li className={`${feedIdStyle.listItem} pb-4`}>
              <div className={feedIdStyle.listItemWrap}>
                <div className={feedIdStyle.listItemWrap}>
                  <img
                    src={testImage}
                    alt="testImage"
                    className={feedIdStyle.image}
                  />
                  <p className="pl-4 text text_type_main-default">
                    Флюоресцентная булка R2-D3
                  </p>
                </div>
                <div className={feedIdStyle.listItemWrap}>
                  <p className="text text_type_digits-default pl-4">2 x 20</p>
                  <CurrencyIcon />
                </div>
              </div>
            </li>
            <li className={`${feedIdStyle.listItem} pb-4`}>
              <div className={feedIdStyle.listItemWrap}>
                <div className={feedIdStyle.listItemWrap}>
                  <img
                    src={testImage}
                    alt="testImage"
                    className={feedIdStyle.image}
                  />
                  <p className="pl-4 text text_type_main-default">
                    Флюоресцентная булка R2-D3
                  </p>
                </div>
                <div className={feedIdStyle.listItemWrap}>
                  <p className="text text_type_digits-default pl-4">2 x 20</p>
                  <CurrencyIcon />
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className={`${feedIdStyle.price} ${feedIdStyle.priceWrap}`}>
          <p className="text text_type_main-default text_color_inactive">
            Вчера, 13:50 i-GMT+3
          </p>
          <div className={`${feedIdStyle.price}`}>
            <p className="text text_type_digits-default">510</p>{" "}
            <CurrencyIcon />
          </div>
        </div>
      </div>
    </section>
  );
}
