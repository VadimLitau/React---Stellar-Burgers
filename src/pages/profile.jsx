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
import { useHistory, Switch, Route } from "react-router-dom";
import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSED,
} from "../services/constants/wsActions";
import useForm from "../hooks/useForm";

import { getCookie } from "../utils/utils";
function ProfileForm() {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const userProfile = state.route.userAuthProfile;
  const inputRefInput = React.useRef(null);
  const [values, handleChange] = useForm();
  React.useEffect(() => {
    values.name = userProfile.name;
    values.email = userProfile.email;
    values.password = userProfile.password;
  }, [userProfile]);

  function saveProfile(e) {
    e.preventDefault();
    dispatch(updateUserProfile(values.email, values.password, values.name));
  }
  function resetProfile() {
    values.name = userProfile.name;
    values.email = userProfile.email;
    values.password = userProfile.password;
  }
  const onIconClickInput = () => {
    setTimeout(() => inputRefInput.current.focus(), 0);
  };
  return (
    <form onSubmit={saveProfile}>
      <div className={ProfileStyle.userProfile}>
        <div className={mainStyle.input}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleChange}
            icon={"EditIcon"}
            value={values.name || userProfile.name || ""}
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
            onChange={handleChange}
            value={values.email || userProfile.email || ""}
            name={"email"}
          />
        </div>
        <div className={`${mainStyle.input}`}>
          <PasswordInput
            onChange={handleChange}
            value={values.password || userProfile.password || ""}
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
            <Route path="/profile" exact={true}>
              <ProfileForm />
            </Route>
            <Route path="/profile/orders" exact={true}>
              <FeedProfile data={data} />
            </Route>
          </Switch>
          {/* {linkState.order && <FeedProfile profile="true" />} */}
        </div>
      </div>
    </section>
  );
}

export default Profile;
