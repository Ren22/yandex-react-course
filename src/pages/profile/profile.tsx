import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "../../components/app/app";
import { ProfileInputs } from "../../components/profile-inputs/profile-inputs";
import { ProfileOrders } from "../../components/profile-orders/profile-orders";
import { logoutUserReducer } from "../../redux/slices/auth";
import {
  selectUserData,
  getUserDataReducer,
  setUserDataReducer,
} from "../../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import profilePageStyle from "./profile.module.css";

export enum PROFILE_TABS {
  PROFILE = "PROFILE",
  ORDERS = "ORDERS",
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
  const user = useAppSelector(selectUserData);
  const history = useHistory();
  const [dataIsChanged, setDataIsChanged] = useState(false);

  const setInitialState = useCallback(() => {
    if (user && user.name && user.email) {
      setName(user.name);
      setLogin(user.email);
      setPassword("");
      setDataIsChanged(false);
    }
  }, [user]);

  useEffect(() => {
    setInitialState();
  }, [setInitialState]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (dataIsChanged) {
      dispatch(
        setUserDataReducer({
          name,
          email: login,
          password,
        })
      );
    } else {
      alert("Data was not changed!");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUserReducer()).then(() =>
      history.push({ pathname: `${ROUTES.LOGIN}` })
    );
  };

  const cancelNewData = () => {
    setInitialState();
  };

  return (
    <>
      <form className={profilePageStyle.main} onSubmit={handleSubmit}>
        <div className={profilePageStyle.main__columnsWrapper}>
          <div className={profilePageStyle.main__columnLeft}>
            <p
              className={`${
                profilePageStyle.main__columnLeft__text
              } text text_type_main-medium ${
                activeTab === PROFILE_TABS.PROFILE ? "" : "text_color_inactive"
              }`}
            >
              <Link to={`${ROUTES.PROFILE}`}>Профиль</Link>
            </p>
            <p
              className={`${
                profilePageStyle.main__columnLeft__text
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
              className={`${profilePageStyle.main__columnLeft__text} text text_type_main-medium text_color_inactive`}
            >
              Выход
            </p>
            {activeTab === PROFILE_TABS.PROFILE && (
              <span
                className={`text text_type_main-small text_color_inactive mt-30`}
              >
                В этом разделе вы можете изменить свои персональные данные
              </span>
            )}
          </div>
          <div className={profilePageStyle.main__columnRight}>
            {activeTab === PROFILE_TABS.PROFILE ? (
              <>
                <ProfileInputs
                  name={name}
                  setName={setName}
                  login={login}
                  setLogin={setLogin}
                  password={password}
                  setPassword={setPassword}
                  setDataIsChanged={setDataIsChanged}
                />
                <div
                  className={`mt-15 ${
                    dataIsChanged
                      ? `${profilePageStyle.footer__btns}`
                      : `${profilePageStyle.footer__btns_hidden}`
                  }`}
                >
                  <div className={`${profilePageStyle.footer__btnsWrapper}`}>
                    <Button
                      onClick={cancelNewData}
                      htmlType="button"
                      type="secondary"
                      size="medium"
                    >
                      Отменить
                    </Button>
                    <Button htmlType="submit" type="primary" size="medium">
                      Сохранить
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <ProfileOrders />
            )}
          </div>
        </div>
      </form>
    </>
  );
};
