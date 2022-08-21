import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import mainStyle from "./main.module.css";
import feedsStyle from "./feeds.module.css";
import Feed from "../components/Feed/feed";
import FeedInfo from "../components/FeedInfo/feedInfo";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/action-types/wsActionTypes";
import { getMessages, getUser, getWsConnected } from "../services/selectors";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
export default function Feeds() {
  // const location = useLocation();
  // // const messages = useSelector(getMessages);
  // // const user = useSelector(getUser);
  // const isConnected = useSelector(getWsConnected);
  //console.log(location.pathname.includes("feeds"));\

  const feedMessages = useSelector((store) => store.ws.messages);
  const items = useSelector((store) => store.item.burgerData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all" });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: "" });
    };
  }, []);

  const orders = feedMessages;

  // console.log(items);

  //console.log(feedMessages);
  return (
    <section className={feedsStyle.page}>
      <div>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента Заказов</h1>
        <Feed data={feedMessages} />
      </div>
      <FeedInfo />
    </section>
  );
}
