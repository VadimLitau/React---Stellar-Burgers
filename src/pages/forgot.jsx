import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import forgotStyle from "./forgot.module.css";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
import { userForgotPass } from "../services/actions/route";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
function Forgot() {
  const state = useSelector((store) => store);
  // console.log(state.route);

  const dispatch = useDispatch();

  const [value, setValue] = React.useState("");
  const forgotHandler = (e) => {
    e.preventDefault();
    setValue(value);
    dispatch(userForgotPass(value));
  };
  //console.log(state.route.userAuthorizationSuccess)
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
    <section className={forgotStyle.page}>
      <AppHeader />
      <form onSubmit={forgotHandler}>
        <div className={forgotStyle.wrap}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <div className={`${forgotStyle.input} pb-6 pt-6`}>
            <Input
              type="email"
              placeholder="Укажите e-mail"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <div className="pb-20">
            <Button>Восстановить</Button>
          </div>
          <p className="text text_type_main-small text_color_inactive">
            Вспомнили пароль?
            <Link to="/login" className={forgotStyle.textLink}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Forgot;
