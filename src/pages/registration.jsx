import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import RegistrationStyle from "./registration.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import { userRegister } from "../services/actions/route";
import { useDispatch, useSelector } from "react-redux";

import { Redirect, useHistory, useLocation } from "react-router-dom";

function Registration() {
  const state = useSelector((store) => store);
  //console.log(state.route);
  const dispatch = useDispatch();
  const [valueName, setValueName] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };

  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const onClickRegister = (e) => {
    e.preventDefault();
    dispatch(userRegister(valueName, valueEmail, valuePassword));
  };

  if (state.route.userAuthorizationSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/",
        }}
      />
    );
  }
  return (
    <section className={RegistrationStyle.page}>
      <AppHeader />
      <form onSubmit={onClickRegister}>
        <div className={RegistrationStyle.wrap}>
          <p className="text text_type_main-medium">Регистрация</p>
          <div className={`${RegistrationStyle.input} pb-6 pt-6`}>
            <Input
              type="text"
              placeholder="Имя"
              onChange={(e) => setValueName(e.target.value)}
              value={valueName}
            />
          </div>
          <div className={`${RegistrationStyle.input} pb-6`}>
            <EmailInput
              onChange={onChangeEmail}
              value={valueEmail}
              name={"email"}
            />
          </div>
          <div className={`${RegistrationStyle.input}`}>
            <PasswordInput
              onChange={onChangePassword}
              value={valuePassword}
              name={"password"}
            />
          </div>
          <div className="pb-20 pt-6">
            <Button type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
          <p className="text text_type_main-small text_color_inactive">
            Уже зарегистрированы?
            <Link to="/login" className={RegistrationStyle.textLink}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Registration;
