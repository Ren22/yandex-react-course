import React, { useState } from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderItem from "../header-item/header-item";
import headerStyles from "./header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Header = () => {
  const [current] = useState("constructor");
  return (
    <>
      <header className={headerStyles.header}>
        <div className={headerStyles.header__box}>
          <HeaderItem
            active={current === "constructor"}
            src="/constructor"
            text="Конструктор"
          >
            <BurgerIcon
              type={current === "constructor" ? "primary" : "secondary"}
            />
          </HeaderItem>
          <HeaderItem
            active={current === "orders"}
            src="/orders"
            text="Лента заказов"
          >
            <ListIcon type={current === "orders" ? "primary" : "secondary"} />
          </HeaderItem>
          <div className={headerStyles.spacing}></div>
        </div>
        <div className={headerStyles.header__box}>
          <Logo />
        </div>
        <div className={headerStyles.header__box}>
          <div className={headerStyles.spacing}></div>
          <HeaderItem
            active={current === "profile"}
            src="/proile"
            text="Личный кабинет"
          >
            <ProfileIcon
              type={current === "proile" ? "primary" : "secondary"}
            />
          </HeaderItem>
        </div>
      </header>
    </>
  );
};

export default Header;
