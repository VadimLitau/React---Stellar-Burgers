import React, { useState } from "react";
import mainStyle from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import logo from "../../images/headerLogo.svg";
import { Link } from "react-router-dom";
export default function AppHeader() {
  const [linkState, setLinkState] = useState({
    burger: true,
    feed: false,
    profile: false,
  });

  const onClick = (elem) => {
    elem === "burger"
      ? setLinkState({ burger: true, feed: false, profile: false })
      : elem === "feed"
      ? setLinkState({ burger: false, feed: true, profile: false })
      : setLinkState({ burger: false, feed: false, profile: true });
  };
  return (
    <header className={mainStyle.header}>
      <nav>
        <ul className={mainStyle.navMenu}>
          <li className="pl-5 pr-5 pb-4 pt-4 mr-2">
            <span className={mainStyle.listItem}>
              <Link
                to="/"
                className={`text text_type_main-default ml-2 ${
                  linkState.burger ? mainStyle.link_active : mainStyle.link
                }`}
                onClick={() => onClick("burger")}
              >
                <BurgerIcon type={linkState.burger ? "primary" : "secondary"} />
                <p className="text text_type_main-default ml-2">Конструктор</p>
              </Link>
            </span>
          </li>

          <li className="l-5 pr-5 pb-4 pt-4 mr-2">
            <span className={mainStyle.listItem}>
              <Link
                to="/feed"
                className={
                  linkState.feed ? mainStyle.link_active : mainStyle.link
                }
                onClick={() => onClick("feed")}
              >
                <ListIcon type={linkState.feed ? "primary" : "secondary"} />
                <p className="text text_type_main-default ml-2">
                  Лента заказов
                </p>
              </Link>
            </span>
          </li>
        </ul>
      </nav>
      <Link to="/" className={mainStyle.link}>
        <img src={logo} alt="логотип" className={mainStyle.logo} />
      </Link>
      <span className={mainStyle.listItem}>
        <Link
          to="/profile"
          className={linkState.profile ? mainStyle.link_active : mainStyle.link}
          onClick={() => onClick()}
        >
          <ProfileIcon type={linkState.profile ? "primary" : "secondary"} />
          <p className="text text_type_main-default ml-2">Личный Кабинет</p>
        </Link>
      </span>
    </header>
  );
}
