import React, { useCallback, useState } from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import mainStyle from "./main.module.css";
import SignInStyle from "./login.module.css";
import { useSelector } from "react-redux";
import { useAuth } from "../services/auth";

function Login() {
  const location = useLocation();
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [valuePassword, setValuePassword] = useState("");
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
  const auth = useAuth();
  const loginHandler = useCallback(
    (e) => {
      e.preventDefault();
      auth.signIn(value, valuePassword);
    },
    [auth, value, valuePassword]
  );
  console.log(auth.user.name);
  if (auth.user.name) {
    return <Redirect to={location?.state?.from || "/"} />;
  }
  return (
    <section className={SignInStyle.main}>
      <form className={SignInStyle.form} onSubmit={loginHandler}>
        <h1 className="pb-6 text text_type_main-medium">Вход</h1>
        <div className={`${mainStyle.input} pb-6`}>
          <EmailInput name={"email"} value={value} onChange={onChange} />
        </div>
        <div className={`${mainStyle.input} pb-6`}>
          <PasswordInput
            onChange={onChangePassword}
            value={valuePassword}
            name={"password"}
          />
        </div>
        <div className="pb-20 text">
          <Button>Войти</Button>
        </div>
        <div className={`pb-4 ${mainStyle.content}`}>
          <p
            className={`text text_type_main-small text_color_inactive ${SignInStyle.text}`}
          >
            Вы — новый пользователь?
          </p>
          <Link
            to="/register"
            className={`text text_type_main-small ${mainStyle.textLink}`}
          >
            Зарегистрироваться
          </Link>
        </div>
        <div className={mainStyle.content}>
          <p
            className={`text text_type_main-small text_color_inactive ${SignInStyle.text}`}
          >
            Забыли пароль?
          </p>
          <Link
            to="/forgot-password"
            className={`text text_type_main-small ${mainStyle.textLink}`}
          >
            Восстановить пароль
          </Link>
        </div>
      </form>
    </section>
  );
}
export default Login;
