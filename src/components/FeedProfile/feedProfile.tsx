import React, { FC } from "react";
import feedStyle from "./feedProfile.module.css";
import FeedItem from "../Feed/FeedItem/feedItem";
import { IFeedItem } from "../../services/types/data";

interface IFeedProfile {
  data: Array<IFeedItem>;
}
const FeedProfile: FC<IFeedProfile> = ({ data }) => {

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
};

export default FeedProfile;
