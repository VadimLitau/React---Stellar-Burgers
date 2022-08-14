import React from "react";
import feedStyle from "./feed.module.css";
import FeedItem from "./FeedItem/feedItem";
export default function Feed() {
  return (
    <section className={feedStyle.head}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента Заказов</h1>
      <ul className={feedStyle.content}>
        <li className={feedStyle.listItem}>
          <FeedItem />
        </li>
        <li className={feedStyle.listItem}>
          <FeedItem />
        </li>
        <li className={feedStyle.listItem}>
          <FeedItem />
        </li>
        <li className={feedStyle.listItem}>
          <FeedItem />
        </li>
        <li className={feedStyle.listItem}>
          <FeedItem />
        </li>
        <li className={feedStyle.listItem}>
          <FeedItem />
        </li>
        <li className={feedStyle.listItem}>
          <FeedItem />
        </li>
      </ul>
    </section>
  );
}
