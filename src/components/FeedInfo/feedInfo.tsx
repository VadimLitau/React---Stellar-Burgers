import React from "react";
import { useSelector } from "../../services/hooks";
import feedInfoStyle from "./feedInfo.module.css";
import { IFeedItem } from "../../services/types/data";
export default function FeedInfo() {
  const dataFeed = useSelector((store) => store.ws.messages);
  let data: IFeedItem[];
  let total = 0;
  let totalDay = 0;
  let feedDone: number[] = [];
  let feedWork: number[] = [];
  let textSizeDone = "default";
  let textSizeWork = "default";
  if (dataFeed.length > 0) {
    data = dataFeed[`${dataFeed.length - 1}`].orders;
    total = dataFeed[`${dataFeed.length - 1}`].total;
    totalDay = dataFeed[`${dataFeed.length - 1}`].totalToday;
    data.forEach((item) => {
      if (item.status === "done") {
        feedDone.push(item.number);
      } else {
        feedWork.push(item.number);
      }
    });
  }

  feedDone.length > 45 ? (textSizeDone = "small") : (textSizeDone = "default");

  feedWork.length > 45 ? (textSizeWork = "small") : (textSizeWork = "default");

  //console.log(data);
  return (
    <section className={`${feedInfoStyle.main} ml-15`}>
      <div className={feedInfoStyle.wrap}>
        <div className={`${feedInfoStyle.wrapList}`}>
          <h2
            className={`${feedInfoStyle.listName} text text_type_main-medium pb-6`}
          >
            Готовы:
          </h2>
          <div className={`${feedInfoStyle.listDone}`}>
            {feedDone.map((item) => {
              return (
                <p
                  className={`${feedInfoStyle.listItem} text text text_type_digits-${textSizeDone} pt-1 pb-1`}
                  key={item}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
        <div className={`${feedInfoStyle.wrapList} ml-9`}>
          <h2
            className={`${feedInfoStyle.listName} text text_type_main-medium pb-6`}
          >
            В работе:
          </h2>
          <div className={`${feedInfoStyle.listWork}`}>
            {feedWork.map((item) => {
              return (
                <p
                  className={`${feedInfoStyle.listItem} text text_type_digits-${textSizeWork} pt-1 pb-1`}
                  key={item}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-15">
        <h2 className={`${feedInfoStyle.listName} text text_type_main-medium`}>
          Выполнено за все время:
        </h2>
        <p className={`${feedInfoStyle.num}`}>{total}</p>
      </div>
      <div className="mt-15">
        <h2 className={`${feedInfoStyle.listName} text text_type_main-medium`}>
          Выполнено за сегодня:
        </h2>
        <p className={`${feedInfoStyle.num}`}>{totalDay}</p>
      </div>
    </section>
  );
}
