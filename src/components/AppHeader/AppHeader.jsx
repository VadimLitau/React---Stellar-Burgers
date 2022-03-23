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
          <li className={`pl-5 pr-5 pb-4 pt-4 mr-2`}>
            <a href="#" target="_blank" className={`${mainStyle.listItem}`}>
              <BurgerIcon type="primary" />
              <p className={`text text_type_main-default ml-2`}>Конструктор</p>
            </a>
          </li>
          <li className={`pl-5 pr-5 pb-4 pt-4 mr-2`}>
            <a href="#" target="_blank" className={`${mainStyle.listItem} `}>
              <ListIcon type="secondary" />
              <p className={`text text_type_main-default ml-2`}>
                Лента заказов
              </p>
            </a>
          </li>
        </ul>
      </nav>
      <a href="#" target="_blank">
        <img src={logo} alt="логотип" className={`${mainStyle.logo}`} />
      </a>
      <a href="#" target="_blank" className={`${mainStyle.listItem}`}>
        <ProfileIcon type="secondary" />
        <p className={`text text_type_main-default ml-2`}>Личный Кабинет</p>
      </a>
    </header>
  );
}
