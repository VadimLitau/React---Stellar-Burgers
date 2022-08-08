import React from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import mainStyle from "./main.module.css";
import { userResetPass } from "../services/actions/route";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

function Reset() {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();
  const [valuePass, setValuePass] = React.useState("");
  const [valueToken, setValueToken] = React.useState("");
  const onClickToken = (e) => {
    e.preventDefault();
    setValueToken(valueToken);
    dispatch(userResetPass(valueToken, valuePass));
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
  console.log(state.route.userForgotPasswordSuccess);
  if (!state.route.userForgotPasswordSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/forgot-password",
        }}
      />
    );
  }
  return (
    <section className={mainStyle.page}>
      <form onSubmit={onClickToken}>
        <div className={mainStyle.wrap}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <div className={`${mainStyle.input} pb-6 pt-6`}>
            <PasswordInput
              value={valuePass}
              onChange={(e) => setValuePass(e.target.value)}
            />
          </div>
          <div className={`${mainStyle.input}`}>
            <Input
              placeholder="Введите код из письма"
              value={valueToken}
              onChange={(e) => setValueToken(e.target.value)}
            />
          </div>
          <div className="pb-20 pt-6">
            <Button>Сохранить</Button>
          </div>
          <p className="text text_type_main-small text_color_inactive">
            Вспомнили пароль?
            <Link to="/login" className={mainStyle.textLink}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Reset;
