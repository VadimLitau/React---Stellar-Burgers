import React from "react";
import mainStyle from "./main.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className={mainStyle.page}>
      <div className={mainStyle.wrap}>
        <h1 className="text text_type_digits-large">404</h1>
        <p className="text text_type_main-large">Страница не найдена</p>
        <div className="pt-10 pb-10">
          <Link to="/login" className="pr-10">
            <Button>Авторизация</Button>
          </Link>
          <Link to="/">
            <Button>Конструктор</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
