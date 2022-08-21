import React, { useEffect } from "react";
import feedStyle from "./feed.module.css";
import FeedItem from "./FeedItem/feedItem";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
export default function Feed() {
  //console.log(profile);
  const dataFeed = useSelector((store) => store.ws.messages);
  let data = null;

  if (dataFeed.length > 0) {
    data = dataFeed[`${dataFeed.length - 1}`].orders;
  }

  return (
    <section className={feedStyle.head}>
      <ul className={feedStyle.content}>
        {data != null &&
          data.map((item) => {
            return <FeedItem item={item} key={uuidv4()} />;
          })}
      </ul>
    </section>
  );
}
