import React from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import forgotStyle from "./forgot.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import { userResetPass } from "../services/actions/route";
import { useDispatch, useSelector  } from "react-redux";
import { Link,Redirect } from "react-router-dom";

function Reset() {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();
  const [valuePass, setValuePass] = React.useState("");
  const [valueToken, setValueToken] = React.useState("");
  const onClickToken = () => {
    setValueToken(valueToken);
    dispatch(userResetPass(valueToken, valuePass));
    //console.log(valueToken, valuePass);
  };

  if (state.route.userAuthorizationSuccess) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }
  return (
    <section className={forgotStyle.page}>
      <AppHeader />
      <div className={forgotStyle.wrap}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <div className="pb-6 pt-6">
          <PasswordInput
            value={valuePass}
            onChange={(e) => setValuePass(e.target.value)}
          />
        </div>
        <Input
          placeholder="Введите код из письма"
          value={valueToken}
          onChange={(e) => setValueToken(e.target.value)}
        />
        <div className="pb-20 pt-6">
          <Button onClick={onClickToken}>Сохранить</Button>
        </div>
        <p className="text text_type_main-small text_color_inactive">
          Вспомнили пароль?
          <Link to="/login" className={forgotStyle.textLink}>
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Reset;
