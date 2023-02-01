import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import OrderInFeedStyle from "./order-in-feed.module.css";

export const OrderInFeed = () => {
  return (
    <div className={`${OrderInFeedStyle.order} pt-4 pb-4 pl-4 pr-4 mb-4`}>
      <header className={`${OrderInFeedStyle.header} mb-4`}>
        <p className="text text_type_digits-default">#034535</p>
        <p className="text text_type_main-default text_color_inactive">
          Сегодня, 16:20
        </p>
      </header>
      <div className="text text_type_main-medium">
        Death Star Starship Main бургер
      </div>
      <footer className={`${OrderInFeedStyle.footer} mt-4`}>
        <div className={`${OrderInFeedStyle.footer__ingredients}`}>
          <div
            style={{ zIndex: 3 }}
            className={`${OrderInFeedStyle.footer__ingredient}`}
          ></div>
          <div
            style={{ zIndex: 2 }}
            className={`${OrderInFeedStyle.footer__ingredient}`}
          ></div>
          <div
            style={{ zIndex: 1 }}
            className={`${OrderInFeedStyle.footer__ingredient}`}
          ></div>
        </div>
        <div className={`${OrderInFeedStyle.footer__price}`}>
          <p className="text text_type_digits-default mr-2">480</p>
          <CurrencyIcon type="primary" />
        </div>
      </footer>
    </div>
  );
};
