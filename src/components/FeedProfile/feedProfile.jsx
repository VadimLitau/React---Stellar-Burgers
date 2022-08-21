import React, { useEffect } from "react";
import feedStyle from "./feedProfile.module.css";
import FeedItem from "../Feed/FeedItem/feedItem";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getCookie } from "../../utils/utils";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../../services/action-types";
import { useLocation } from "react-router-dom";
export default function FeedProfile() {
  //console.log(profile);
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const userProfile = state.route.userAuthProfile;
  // const token = "?token=" + getCookie("token");
  //console.log(userProfile.name);

  //console.log(profile);

  useEffect(() => {
    const token = "?token=" + getCookie("token");
    if (userProfile) {
      dispatch({ type: WS_CONNECTION_START, payload: token });
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: "" });
    };
  }, [userProfile]);
  const dataFeed = useSelector((store) => store.ws.messages);
  let data = null;

  if (dataFeed.length > 0) {
    data = dataFeed[`${dataFeed.length - 1}`].orders;
  }
  // console.log(dataFeed);
  return (
    <section className={feedStyle.head}>
      <ul className={feedStyle.content}>
        {data != null &&
          data.map((item) => {
            return <FeedItem item={item} key={uuidv4()} profile="true" />;
          })}
      </ul>
    </section>
  );
}
