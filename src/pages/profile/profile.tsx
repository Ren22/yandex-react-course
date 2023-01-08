import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../components/app/app";
import Header from "../../components/header/header";
import { ProfileInputs } from "../../components/profile-inputs/profile-inputs";
import { ProfileOrders } from "../../components/profile-orders/profile-orders";
import { logoutUserReducer } from "../../redux/slices/auth";
import {
  selectUserData,
  getUserDataReducer,
  setUserDataReducer,
} from "../../redux/slices/user";
import { useAppDispatch } from "../../redux/store";

import profilePageStyle from "./profile.module.css";

export enum PROFILE_TABS {
  PROFILE = "PROFILE",
  ORDERS = "ORDERS",
  LOGOUT = "LOGOUT",
}

type Props = {
  activeTab?: keyof typeof PROFILE_TABS;
};

export const ProfilePage = ({ activeTab }: Props) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserDataReducer());
  }, [dispatch]);
  const user = useSelector(selectUserData);
  const history = useHistory();

  useEffect(() => {
    if (user && user.name && user.email) {
      setName(user.name);
      setLogin(user.email);
    }
  }, [user]);

  const setNewUserData = () => {
    dispatch(
      setUserDataReducer({
        name,
        email: login,
        password,
      })
    );
  };

  const handleLogout = async () => {
    await dispatch(logoutUserReducer());
    history.push({ pathname: `${ROUTES.MAIN}` });
  };

  return (
    <>
      <Header />
      <main className={profilePageStyle.main}>
        <div className={profilePageStyle.main__columnsWrapper}>
          <div className={profilePageStyle.main__column1}>
            <p
              className={`${
                profilePageStyle.main__column1__text
              } text text_type_main-medium ${
                activeTab === PROFILE_TABS.PROFILE ? "" : "text_color_inactive"
              }`}
            >
              <Link to={`${ROUTES.PROFILE}`}>Профиль</Link>
            </p>

            <p
              className={`${
                profilePageStyle.main__column1__text
              } text text_type_main-medium ${
                activeTab === PROFILE_TABS.ORDERS ? "" : "text_color_inactive"
              }`}
            >
              <Link to={`${ROUTES.PROFILE}${ROUTES.ORDERS}`}>
                История заказов
              </Link>
            </p>
            <p
              onClick={handleLogout}
              className={`${profilePageStyle.main__column1__text} text text_type_main-medium text_color_inactive`}
            >
              Выход
            </p>
          </div>
          <div className={profilePageStyle.main__column2}>
            {activeTab === PROFILE_TABS.PROFILE ? (
              <ProfileInputs
                name={name}
                setName={setName}
                login={login}
                setLogin={setLogin}
                password={password}
                setPassword={setPassword}
              />
            ) : (
              <ProfileOrders />
            )}
          </div>
        </div>
        <div className={`${profilePageStyle.main__footer} mt-10`}>
          <span className={"text text_type_main-small text_color_inactive"}>
            В этом разделе вы можете изменить свои персональные данные
          </span>
          <Button
            onClick={setNewUserData}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      </main>
    </>
  );
};
