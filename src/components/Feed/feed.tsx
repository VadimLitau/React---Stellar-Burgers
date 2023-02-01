import React from "react";
import feedStyle from "./feed.module.css";
import FeedItem from "./FeedItem/feedItem";
import { useSelector } from "../../services/hooks";
import { RootState } from "../../services/types";
import { IFeedItem } from "../../services/types/data";
export default function Feed() {
  const dataFeed = useSelector((store: RootState) => store.ws.messages);
  let data = null;

  if (dataFeed.length > 0) {
    data = dataFeed[`${dataFeed.length - 1}`].orders;
  }

  return (
    <section className={feedStyle.head}>
      <ul className={feedStyle.content}>
        {data != null &&
          data.map((item: IFeedItem) => {
            return <FeedItem item={item} key={item._id} />;
          })}
      </ul>
    </section>
  );
}
