import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import forgotStyle from "./forgot.module.css";
import AppHeader from "../components/AppHeader/AppHeader";

function Reset() {
  return (
    <section className={forgotStyle.page}>
      <AppHeader />
      <div className={forgotStyle.wrap}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="pb-6 pt-6">
          <PasswordInput />
        </div>
        <Input placeholder="Введите код из письма" />
        <div className="pb-20 pt-6">
          <Button>Сохранить</Button>
        </div>
        <p className="text text_type_main-small text_color_inactive">
          Вспомнили пароль?
          <a href="#" className={forgotStyle.textLink}>
            Войти
          </a>
        </p>
      </div>
    </section>
  );
}

export default Reset;
