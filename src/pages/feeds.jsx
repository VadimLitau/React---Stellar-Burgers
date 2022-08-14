import React, { useState } from "react";
import mainStyle from "./main.module.css";
import feedsStyle from "./feeds.module.css";
import Feed from "../components/Feed/feed";
import FeedInfo from "../components/FeedInfo/feedInfo";
export default function Feeds() {
  return (
    <section className={feedsStyle.page}>
      <Feed />
      <FeedInfo />
    </section>
  );
}
