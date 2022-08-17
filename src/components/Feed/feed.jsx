import React, { useEffect } from "react";
import feedStyle from "./feed.module.css";
import FeedItem from "./FeedItem/feedItem";
import { useDispatch, useSelector } from "react-redux";
export default function Feed() {
  return (
    <section className={feedStyle.head}>
      <ul className={feedStyle.content}>
        <li className={feedStyle.listItem}>
          <FeedItem />
        </li>
      </ul>
    </section>
  );
}
