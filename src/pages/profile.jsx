import React, {useState, useCallback} from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import ProfileStyle from "./profile.module.css";
import AppHeader from "../components/AppHeader/AppHeader";
import { useSelector } from "react-redux";
import { useAuth } from "../services/auth";
import {Redirect} from "react-router-dom";
function Profile() {
  const state = useSelector((store) => store);
  //console.log(state.route.userAuthProfile)
  //Input
  const [valueInput, setValueInput] = useState(`${state.route.userAuthProfile.name}`);
  const inputRefInput = React.useRef(null);
  const onIconClickInput = () => {
    setTimeout(() => inputRefInput.current.focus(), 0);
    //alert("Icon Click Callback");
  };
  //Email
  const [valueEmail, setValueEmail] = useState(`${state.route.userAuthProfile.email}`);
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  //Password
  const [valuePassword, setValuePassword] = useState("password");
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
  let auth = useAuth();
const handleClickLogout = useCallback(
  e => {
    e.preventDefault();
    //console.log(localStorage.getItem('token'))
    auth.signOut(localStorage.getItem('refreshToken'));
  },
  [auth]
);
//
if (!state.route.userAuth) {
  return (
    <Redirect
      to={{
        pathname: '/'
      }}
    />
  );
}
  
  return (
    <section className={ProfileStyle.page}>
      <AppHeader />
      <div className={ProfileStyle.wrap}>
        <div className={ProfileStyle.main}>
          <nav className={`pr-30 ${ProfileStyle.nav}`}>
            <ul className={ProfileStyle.navList}>
              <li
                className={`text text_type_main-medium ${ProfileStyle.navItem}`}
              >
                Профиль
              </li>
              <li
                className={`text text_type_main-medium text_color_inactive ${ProfileStyle.navItem}`}
              >
                История Заказов
              </li>
              <li onClick={handleClickLogout} style={{cursor:'pointer'}}
                className={`text text_type_main-medium text_color_inactive ${ProfileStyle.navItem}`}
              >
                Выход
              </li>
              <li className="pt-20 text text_type_main-small text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
              </li>
            </ul>
          </nav>
          <div className={ProfileStyle.userProfile}>
            <div className={ProfileStyle.test}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={(e) => setValueInput(e.target.value)}
                icon={"EditIcon"}
                value={valueInput}
                name={"name"}
                error={false}
                ref={inputRefInput}
                onIconClick={onIconClickInput}
                errorText={"Ошибка"}
                size={"default"}
              />
            </div>
            <div className="pt-6 pb-6">
              <EmailInput
                onChange={onChangeEmail}
                value={valueEmail}
                name={"email"}
              />
            </div>
            <PasswordInput
              onChange={onChangePassword}
              value={valuePassword}
              name={"password"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
