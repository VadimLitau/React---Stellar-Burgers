import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import RegistrationStyle from "./registration.module.css";
import AppHeader from "../components/AppHeader/AppHeader";

function Registration() {
  return (
    <section className={RegistrationStyle.page}>
      <AppHeader />
      <div className={RegistrationStyle.wrap}>
        <p className="text text_type_main-medium">Регистрация</p>
        <div className="pb-6 pt-6">
          <Input type="text" placeholder="Имя" />
        </div>
        <div className="pb-6">
          <EmailInput name={"e-mail"} />
        </div>
        <PasswordInput />

        <div className="pb-20 pt-6">
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
        <p className="text text_type_main-small text_color_inactive">
          Уже зарегистрированы?
          <a href="#" className={RegistrationStyle.textLink}>
            Войти
          </a>
        </p>
      </div>
    </section>
  );
}

export default Registration;
