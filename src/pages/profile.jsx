import React, { useState, useCallback, useEffect } from "react";
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
import FeedProfile from "../components/FeedProfile/feedProfile";
import { useHistory, Switch } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute/ProtectedRoute";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/action-types";

import { getCookie } from "../utils/utils";
function ProfileForm() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const userProfile = state.route.userAuthProfile;
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
  return (
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
  );
}

function Profile() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const history = useHistory();

  const auth = useAuth();
  const handleClickLogout = useCallback(
    (e) => {
      e.preventDefault();
      auth.signOut(localStorage.getItem("refreshToken"));
    },
    [auth]
  );

  const [linkState, setLinkState] = useState({
    profile: true,
    order: false,
  });

  const onClick = (elem) => {
    if (elem === "order") {
      setLinkState({ profile: false, order: true });
      history.push("/profile/orders");
    } else {
      setLinkState({ profile: true, order: false });
      history.push("/profile");
    }
  };

  const userProfile = state.route.userAuthProfile;
  let data = null;
  useEffect(() => {
    const token = "?token=" + getCookie("token");
    // console.log(userProfile);
    if (userProfile) {
      dispatch({ type: WS_CONNECTION_START, payload: token });
    }

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED, payload: "" });
    };
  }, [userProfile]);
  const dataFeed = useSelector((store) => store.ws.messages);

  if (dataFeed.length > 0) {
    //console.log(dataFeed);
    data = dataFeed[`${dataFeed.length - 1}`].orders;
  }
  //console.log(data);
  return (
    <section className={mainStyle.page}>
      <div className={ProfileStyle.wrap}>
        <div className={ProfileStyle.main}>
          <nav className={`pr-30 ${ProfileStyle.nav}`}>
            <ul className={ProfileStyle.navList}>
              <li
                className={`text text_type_main-medium ${
                  ProfileStyle.navItem
                } ${
                  linkState.profile
                    ? ProfileStyle.navItem_active
                    : ProfileStyle.navItem_inActive
                }`}
              >
                <span
                  onClick={() => onClick("profile")}
                  style={{ cursor: "pointer" }}
                >
                  Профиль
                </span>
              </li>
              <li
                className={`text text_type_main-medium ${
                  ProfileStyle.navItem
                } ${
                  linkState.order
                    ? ProfileStyle.navItem_active
                    : ProfileStyle.navItem_inActive
                }`}
              >
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => onClick("order")}
                >
                  История Заказов
                </span>
              </li>
              <li
                className={`text text_type_main-medium text_color_inactive ${ProfileStyle.navItem}`}
              >
                <span onClick={handleClickLogout} style={{ cursor: "pointer" }}>
                  Выход
                </span>
              </li>
              <li className="pt-20 text text_type_main-small text_color_inactive">
                В этом разделе вы можете изменить свои персональные данные
              </li>
            </ul>
          </nav>

          <Switch>
            <ProtectedRoute path="/profile" exact={true}>
              <ProfileForm />
            </ProtectedRoute>
            <ProtectedRoute path="/profile/orders" exact={true}>
              <FeedProfile data={data} />
            </ProtectedRoute>
          </Switch>
          {/* {linkState.order && <FeedProfile profile="true" />} */}
        </div>
      </div>
    </section>
  );
}

export default Profile;
