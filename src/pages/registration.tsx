import React, { FormEvent } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import mainStyle from "./main.module.css";
import { userRegister } from "../services/actions/route";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useForm from "../hooks/useForm";
import { RootState } from "../services/types";

function Registration() {
  const state = useSelector((store: RootState) => store);
  const dispatch = useDispatch();
  const [values, handleChange] = useForm();

  const onClickRegister = (e: FormEvent) => {
    e.preventDefault();
    dispatch(userRegister(values.name, values.email, values.password));
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
    <section className={mainStyle.page}>
      <form onSubmit={onClickRegister}>
        <div className={mainStyle.wrap}>
          <p className="text text_type_main-medium">Регистрация</p>
          <div className={`${mainStyle.input} pb-6 pt-6`}>
            <Input
              type="text"
              placeholder="Имя"
              name="name"
              onChange={handleChange}
              value={values.name || ""}
            />
          </div>
          <div className={`${mainStyle.input} pb-6`}>
            <EmailInput
              onChange={handleChange}
              value={values.email || ""}
              name={"email"}
            />
          </div>
          <div className={`${mainStyle.input}`}>
            <PasswordInput
              onChange={handleChange}
              value={values.password || ""}
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
            <Link to="/login" className={mainStyle.textLink}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}

export default Registration;
