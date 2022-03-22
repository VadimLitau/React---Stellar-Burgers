import React from "react";
import mainStyle from "./AppHeader.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import logo from "../../images/headerLogo.svg";
export default function AppHeader() {
  return (
    <header className={mainStyle.header}>
      <nav>
        <ul className={mainStyle.navMenu}>
          <li>
            <a href="#" target="_blank" className={mainStyle.listItem}>
              <BurgerIcon type="primary" />
              <p className={mainStyle.listText}>Конструктор</p>
            </a>
          </li>
          <li>
            <a href="#" target="_blank" className={mainStyle.listItem}>
              <ListIcon type="secondary" />
              <p className={mainStyle.listText}>Навигация</p>
            </a>
          </li>
          <li>
            <a href="#" target="_blank">
              <img src={logo} alt="логотип" className={mainStyle.logo} />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" className={mainStyle.listItem}>
              <ProfileIcon type="secondary" />
              <p className={mainStyle.listText}>Личный Кабинет</p>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
