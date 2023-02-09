import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../app/app";

const Header = () => {
  const location = useLocation();

  return (
    <section className={headerStyles.headerWrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.header__box}>
          <Link to={ROUTES.MAIN}>
            <div
              className={`${headerStyles.header__item}
            ${
              location.pathname === ROUTES.MAIN
                ? headerStyles.header__item_active
                : null
            } `}
            >
              <BurgerIcon
                type={
                  location.pathname === ROUTES.MAIN ? "primary" : "secondary"
                }
              />
              <span className="text text_type_main-default p-2 mr-2">
                Конструктор
              </span>
            </div>
          </Link>
          <Link to={ROUTES.FEED}>
            <div
              className={`${headerStyles.header__item}
            ${
              location.pathname === ROUTES.FEED
                ? headerStyles.header__item_active
                : null
            } `}
            >
              <ListIcon
                type={
                  location.pathname === ROUTES.FEED ? "primary" : "secondary"
                }
              />
              <span className="text text_type_main-default p-2">
                Лента заказов
              </span>
            </div>
          </Link>
          <div className={headerStyles.spacing}></div>
        </div>
        <div className={headerStyles.header__box}>
          <Logo />
        </div>
        <div className={headerStyles.header__box}>
          <div className={headerStyles.spacing}></div>
          <Link to={ROUTES.PROFILE}>
            <div
              className={`${headerStyles.header__item}
            ${
              location.pathname.includes(ROUTES.PROFILE)
                ? headerStyles.header__item_active
                : ""
            } `}
            >
              <ProfileIcon
                type={
                  location.pathname.includes(ROUTES.PROFILE)
                    ? "primary"
                    : "secondary"
                }
              />
              <span className="text text_type_main-default p-2">
                Личный кабинет
              </span>
            </div>
          </Link>
        </div>
      </header>
    </section>
  );
};

export default Header;
