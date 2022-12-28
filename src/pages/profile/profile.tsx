import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../components/app/app";
import Header from "../../components/header/header";
import { ProfileInputs } from "../../components/profile-inputs/profile-inputs";
import { ProfileOrders } from "../../components/profile-orders/profile-orders";

import profilePageStyle from "./profile.module.css";

export enum PROFILE_TABS {
  PROFILE = "PROFILE",
  ORDERS = "ORDERS",
}

type Props = {
  activeTab?: keyof typeof PROFILE_TABS;
};

export const ProfilePage = ({ activeTab }: Props) => {
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
              className={`${profilePageStyle.main__column1__text} text text_type_main-medium text_color_inactive`}
            >
              Выход
            </p>
            <p
              className={"text text_type_main-small text_color_inactive mt-20"}
            >
              В этом разделе вы можете изменить свои персональные данные
            </p>
          </div>
          <div className={profilePageStyle.main__column2}>
            {activeTab === PROFILE_TABS.PROFILE ? (
              <ProfileInputs />
            ) : (
              <ProfileOrders />
            )}
          </div>
        </div>
      </main>
    </>
  );
};
