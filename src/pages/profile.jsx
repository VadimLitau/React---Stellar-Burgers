import React, { useState, useCallback } from "react";
import {
  EmailInput,
  PasswordInput,
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import mainStyle from "./main.module.css";
import ProfileStyle from "./profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../services/auth";
import { updateUserProfile } from "../services/actions/route";
function Profile() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const userProfile = state.route.userAuthProfile;
  console.log(userProfile);
  //Input
  const [valueInput, setValueInput] = useState("");
  const inputRefInput = React.useRef(null);
  const onIconClickInput = () => {
    setTimeout(() => inputRefInput.current.focus(), 0);
  };
  //Email
  const [valueEmail, setValueEmail] = useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };
  //Password
  const [valuePassword, setValuePassword] = useState("");
  const onChangePassword = (e) => {
    setValuePassword(e.target.value);
  };
  const auth = useAuth();
  const handleClickLogout = useCallback(
    (e) => {
      e.preventDefault();
      auth.signOut(localStorage.getItem("refreshToken"));
    },
    [auth]
  );
  React.useEffect(() => {
    setValueInput(userProfile.name);
    setValueEmail(userProfile.email);
    setValuePassword(userProfile.password);
  }, [userProfile]);

  function saveProfile(e) {
    e.preventDefault();
    dispatch(updateUserProfile(valueEmail, valuePassword, valueInput));
  }
  function resetProfile() {
    setValueInput(state.route.userAuthProfile.name);
    setValueEmail(state.route.userAuthProfile.email);
    setValuePassword(state.route.userAuthProfile.password);
  }

  return (
    <section className={mainStyle.page}>
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
              <li
                onClick={handleClickLogout}
                style={{ cursor: "pointer" }}
                className={`text text_type_main-medium text_color_inactive ${ProfileStyle.navItem}`}
              >
                Выход
              </li>
              <li className="pt-20 text text_type_main-small text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
              </li>
            </ul>
          </nav>
          <form onSubmit={saveProfile}>
            <div className={ProfileStyle.userProfile}>
              <div className={mainStyle.input}>
                <Input
                  type={"text"}
                  placeholder={"Имя"}
                  onChange={(e) => setValueInput(e.target.value)}
                  icon={"EditIcon"}
                  value={valueInput ? valueInput : ""}
                  name={"name"}
                  error={false}
                  ref={inputRefInput}
                  onIconClick={onIconClickInput}
                  errorText={"Ошибка"}
                  size={"default"}
                />
              </div>
              <div className={`${mainStyle.input} pt-6 pb-6`}>
                <EmailInput
                  onChange={onChangeEmail}
                  value={valueEmail ? valueEmail : ""}
                  name={"email"}
                />
              </div>
              <div className={`${mainStyle.input}`}>
                <PasswordInput
                  onChange={onChangePassword}
                  value={valuePassword ? valuePassword : ""}
                  name={"password"}
                />
              </div>
              <div className={`${ProfileStyle.buttons} pt-10`}>
                <Button>Сохранить</Button>
                <Button onClick={resetProfile}>Отмена</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Profile;
