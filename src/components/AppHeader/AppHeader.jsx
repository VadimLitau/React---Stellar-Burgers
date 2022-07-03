import React from "react";
import mainStyle from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import logo from "../../images/headerLogo.svg";
import { Link } from "react-router-dom";
export default function AppHeader() {
  return (
    <header className={mainStyle.header}>
      <nav>
        <ul className={mainStyle.navMenu}>
          <li className="pl-5 pr-5 pb-4 pt-4 mr-2">
            <span className={mainStyle.listItem}>
              <BurgerIcon type="primary" />
              <Link
                to="/"
                className={`text text_type_main-default ml-2 ${mainStyle.itemMenu_active}`}
              >
                Конструктор
              </Link>
            </span>
          </li>
          <li className="l-5 pr-5 pb-4 pt-4 mr-2">
            <a href="#" className={mainStyle.listItem}>
              <ListIcon type="secondary" />
              <p className="text text_type_main-default ml-2">Лента заказов</p>
            </a>
          </li>
        </ul>
      </nav>
      <a href="#">
        <img src={logo} alt="логотип" className={mainStyle.logo} />
      </a>
      <span className={mainStyle.listItem}>
        <ProfileIcon type="secondary" />
        <Link to="/profile" className={mainStyle.link}>
          <p className="text text_type_main-default ml-2">Личный Кабинет</p>
        </Link>
      </span>
    </header>
  );
}
