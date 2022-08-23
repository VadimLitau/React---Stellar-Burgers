import React, { useEffect } from "react";
import feedStyle from "./feedProfile.module.css";
import FeedItem from "../Feed/FeedItem/feedItem";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

export default function FeedProfile({ data }) {
  //console.log(data);
  return (
    <section className={feedStyle.head}>
      <ul className={feedStyle.content}>
        {data != null &&
          [...data].reverse().map((item) => {
            return <FeedItem item={item} key={item._id} profile="true" />;
          })}
      </ul>
    </section>
  );
}
