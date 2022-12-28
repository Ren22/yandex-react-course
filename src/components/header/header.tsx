import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyles from "./header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useRouteMatch } from "react-router-dom";
import { ROUTES } from "../app/app";

const Header = () => {
  const { path } = useRouteMatch();

  return (
    <section className={headerStyles.headerWrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.header__box}>
          <Link to={ROUTES.MAIN}>
            <div
              className={`${headerStyles.header__item}
            ${path === ROUTES.MAIN ? headerStyles.header__item_active : null} `}
            >
              <BurgerIcon
                type={path === ROUTES.MAIN ? "primary" : "secondary"}
              />
              <span className="text text_type_main-default p-2 mr-2">
                Конструктор
              </span>
            </div>
          </Link>
          <Link to={ROUTES.ORDERS}>
            <div
              className={`${headerStyles.header__item}
            ${
              path === ROUTES.ORDERS ? headerStyles.header__item_active : null
            } `}
            >
              <ListIcon
                type={path === ROUTES.ORDERS ? "primary" : "secondary"}
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
              path === ROUTES.PROFILE ||
              path === `${ROUTES.PROFILE}/${ROUTES.ORDERS}`
                ? headerStyles.header__item_active
                : ""
            } `}
            >
              <ProfileIcon
                type={
                  path === ROUTES.PROFILE ||
                  path === `${ROUTES.PROFILE}/${ROUTES.ORDERS}`
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
