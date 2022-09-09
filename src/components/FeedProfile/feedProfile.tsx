import React, { FC } from "react";
import feedStyle from "./feedProfile.module.css";
import FeedItem from "../Feed/FeedItem/feedItem";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHistory, Switch } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/constants/wsActions";
import { getCookie } from "../../utils/utils";
interface IFeedProfile {
  data: any;
}
const FeedProfile: FC<IFeedProfile> = ({ data }) => {
  return (
    <section className={feedStyle.head}>
      <ul className={feedStyle.content}>
        {data != null &&
          [...data].reverse().map((item) => {
            //console.log(item);
            return <FeedItem item={item} key={item._id} profile="true" />;
          })}
      </ul>
    </section>
  );
};

export default FeedProfile;
