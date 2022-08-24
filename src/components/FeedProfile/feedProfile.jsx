import React, { useEffect } from "react";
import feedStyle from "./feedProfile.module.css";
import FeedItem from "../Feed/FeedItem/feedItem";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useHistory, Switch } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/action-types";
import { getCookie } from "../../utils/utils";

export default function FeedProfile({ data }) {
  //console.log(data);
  // const dispatch = useDispatch();
  // const state = useSelector((store) => store);
  // const history = useHistory();
  // const userProfile = state.route.userAuthProfile;
  // let data = null;
  // const token = "?token=" + getCookie("token");
  // // console.log(userProfile);
  // useEffect(() => {
  //   if (userProfile) {
  //     dispatch({ type: WS_CONNECTION_START, payload: token });
  //   }

  //   return () => {
  //     dispatch({ type: WS_CONNECTION_CLOSED, payload: "" });
  //   };
  // }, [userProfile]);
  // const dataFeed = useSelector((store) => store.ws.messages);

  // if (dataFeed.length > 0) {
  //   //console.log(dataFeed);
  //   data = dataFeed[`${dataFeed.length - 1}`].orders;
  // }
  // //console.log(data);
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
}
