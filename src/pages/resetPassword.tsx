import React, { FormEvent } from "react";
import {
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import mainStyle from "./main.module.css";
import { userResetPass } from "../services/actions/route";
import { useDispatch, useSelector } from "../services/hooks";
import { Link, Redirect } from "react-router-dom";
import useForm from "../hooks/useForm";

function Reset() {
  const state = useSelector((store) => store);
  const [values, handleChange] = useForm();
  const dispatch = useDispatch();
  const onClickToken = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userResetPass(values.token, values.password));
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
  //console.log(state.route.userForgotPasswordSuccess);
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
              name="password"
              value={values.password || ""}
              onChange={handleChange}
            />
          </div>
          <div className={`${mainStyle.input}`}>
            <Input
              placeholder="Введите код из письма"
              name="token"
              value={values.token || ""}
              onChange={handleChange}
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
