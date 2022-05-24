import React from "react";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import SignInStyle from "./signIn.module.css";

function SignIn() {
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const [valuePassword, setValuePassword] = React.useState("");
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
  return (
    <section className={SignInStyle.main}>
      <h1 className="pb-6 text text_type_main-medium">Вход</h1>
      <div className="pb-6">
        <EmailInput name={"email"} value={value} onChange={onChange} />
      </div>
      <div className="pb-6">
        <PasswordInput
          onChange={onChangePassword}
          value={valuePassword}
          name={"password"}
        />
      </div>
      <div className="pb-20 text">
        <Button>Войти</Button>
      </div>
      <div className={`pb-4 ${SignInStyle.wrap}`}>
        <p className={`text text_type_main-small ${SignInStyle.text}`}>
          Вы — новый пользователь?
        </p>
        <a
          href="#"
          className={`text text_type_main-small ${SignInStyle.textLink}`}
        >
          Зарегистрироваться
        </a>
      </div>
      <div className={SignInStyle.wrap}>
        <p className={`text text_type_main-small ${SignInStyle.text}`}>
          Забыли пароль?
        </p>
        <a
          href="#"
          className={`text text_type_main-small ${SignInStyle.textLink}`}
        >
          Восстановить пароль
        </a>
      </div>
    </section>
  );
}

export default SignIn;
