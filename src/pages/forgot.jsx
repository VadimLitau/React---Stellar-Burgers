import React from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import mainStyle from "./main.module.css";
import { Link } from "react-router-dom";
import { userForgotPass } from "../services/actions/route";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useForm from "../hooks/useForm";
function Forgot() {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();
  const [values, handleChange] = useForm();

  const forgotHandler = (e) => {
    e.preventDefault();
    //console.log(values.email);
    dispatch(userForgotPass(values.email));
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
  if (state.route.userForgotPasswordSuccess) {
    return (
      <Redirect
        to={{
          pathname: "/reset-password",
        }}
      />
    );
  }
  return (
    <section className={mainStyle.page}>
      <form onSubmit={forgotHandler}>
        <div className={mainStyle.wrap}>
          <h1 className="text text_type_main-medium">Восстановление пароля</h1>
          <div className={`${mainStyle.input} pb-6 pt-6`}>
            <Input
              type="email"
              placeholder="Укажите e-mail"
              value={values.email || ""}
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="pb-20">
            <Button>Восстановить</Button>
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

export default Forgot;
