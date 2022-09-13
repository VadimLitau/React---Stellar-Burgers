import React, { useEffect } from "react";
import { useDispatch } from "../services/hooks";
//В - внимательность) Геннадий, спасибо вам большое за вашу работу. Ваши комментарии и подсказки очень ценны, без них к каким-то решениям я бы еще не скоро пришел =)
import feedsStyle from "./feeds.module.css";
import Feed from "../components/Feed/feed";
import FeedInfo from "../components/FeedInfo/feedInfo";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/constants/wsActions";
export default function Feeds() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: "/all" });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: "" });
    };
  }, []);

  return (
    <section className={feedsStyle.page}>
      <div>
        <h1 className="text text_type_main-large mt-10 mb-5">Лента Заказов</h1>
        <Feed />
      </div>
      <FeedInfo />
    </section>
  );
}
