import React, { useEffect } from "react";
import feedStyle from "./feed.module.css";
import FeedItem from "./FeedItem/feedItem";
import { useSelector } from "../../services/hooks";
import { RootState } from "../../services/types";
import { IFeedItem } from "../../services/types/data";
export default function Feed() {
  //console.log(profile);
  const dataFeed = useSelector((store: RootState) => store.ws.messages);
  //console.log(dataFeed[`${dataFeed.length - 1}`].orders);
  let data = null;

  if (dataFeed.length > 0) {
    data = dataFeed[`${dataFeed.length - 1}`].orders;
  }

  return (
    <section className={feedStyle.head}>
      <ul className={feedStyle.content}>
        {data != null &&
          data.map((item: IFeedItem) => {
            //console.log(item);
            return <FeedItem item={item} key={item._id} />;
          })}
      </ul>
    </section>
  );
}
