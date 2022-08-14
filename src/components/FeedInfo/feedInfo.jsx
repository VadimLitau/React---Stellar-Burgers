import React from "react";
import feedInfoStyle from "./feedInfo.module.css";
export default function FeedInfo() {
  return (
    <section className={`${feedInfoStyle.main} ml-15`}>
      <div className={feedInfoStyle.wrap}>
        <div className={`${feedInfoStyle.wrapList}`}>
          <h2
            className={`${feedInfoStyle.listName} text text_type_main-medium pb-6`}
          >
            Готовы:
          </h2>
          <ul className={`${feedInfoStyle.listDone}`}>
            <li
              className={`${feedInfoStyle.listItem} text text_type_digits-default text text_type_digits-default pt-1 pb-1`}
            >
              034533
            </li>
            <li
              className={`${feedInfoStyle.listItem} text text_type_digits-default text text_type_digits-default pt-1 pb-1`}
            >
              034532
            </li>
            <li
              className={`${feedInfoStyle.listItem} text text_type_digits-default text text_type_digits-default pt-1 pb-1`}
            >
              034530
            </li>
            <li
              className={`${feedInfoStyle.listItem} text text_type_digits-default text text_type_digits-default pt-1 pb-1`}
            >
              034527
            </li>
            <li
              className={`${feedInfoStyle.listItem} text text_type_digits-default text text_type_digits-default pt-1 pb-1`}
            >
              034525
            </li>
          </ul>
        </div>
        <div className={`${feedInfoStyle.wrapList} ml-9`}>
          <h2
            className={`${feedInfoStyle.listName} text text_type_main-medium pb-6`}
          >
            В работе:
          </h2>
          <ul className={`${feedInfoStyle.listWork}`}>
            <li
              className={`${feedInfoStyle.listItem} text text_type_digits-default text text_type_digits-default pt-1 pb-1`}
            >
              034538
            </li>
            <li
              className={`${feedInfoStyle.listItem} text text_type_digits-default text text_type_digits-default pt-1 pb-1`}
            >
              034541
            </li>
            <li
              className={`${feedInfoStyle.listItem} text text_type_digits-default text text_type_digits-default pt-1 pb-1`}
            >
              034542
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-15">
        <h2 className={`${feedInfoStyle.listName} text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        <p className={`${feedInfoStyle.num}`}>28 752</p>
      </div>
      <div className="mt-15">
        <h2 className={`${feedInfoStyle.listName} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h2>
        <p className={`${feedInfoStyle.num}`}>138</p>
      </div>
    </section>
  );
}
