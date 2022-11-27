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
    <header className={headerStyles.header}>
      <div className={headerStyles.box}>
        <HeaderItem text="Конструктор">
          <BurgerIcon type={"primary"} />
        </HeaderItem>
        <HeaderItem text="Лента заказов">
          <ListIcon type={"primary"} />
        </HeaderItem>
      </div>
      <div className={headerStyles.box}>
        <Logo />
      </div>
      <div className={headerStyles.box}>
        <HeaderItem text="Личный кабинет">
          <ProfileIcon type={"primary"} />
        </HeaderItem>
      </div>
    </header>
  );
};

export default Header;
