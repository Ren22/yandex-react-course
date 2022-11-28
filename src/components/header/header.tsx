import React from "react";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import HeaderItem from "../header-item/header-item";
import headerStyles from "./header.module.css";
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

const Header = () => {
  return (
    <div className={headerStyles.wrapper}>
      <header className={headerStyles.header}>
        <div className={headerStyles.header__box}>
          <HeaderItem text="Конструктор">
            <BurgerIcon type={"primary"} />
          </HeaderItem>
          <HeaderItem text="Лента заказов">
            <ListIcon type={"primary"} />
          </HeaderItem>
          <div className={headerStyles.spacing}></div>
        </div>
        <div className={headerStyles.header__box}>
          <Logo />
        </div>
        <div className={headerStyles.header__box}>
          <div className={headerStyles.spacing}></div>
          <HeaderItem text="Личный кабинет">
            <ProfileIcon type={"primary"} />
          </HeaderItem>
        </div>
      </header>
    </div>
  );
};

export default Header;
