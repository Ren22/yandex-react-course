import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import OrderInfoFeedPopUpStyle from "./order-info-feed-popup.module.css";

export const OrderInfoFeedPopUp = () => {
  return (
    <div className={`${OrderInfoFeedPopUpStyle.wrapper}`}>
      <section className={`${OrderInfoFeedPopUpStyle.content} pl-10 pr-10`}>
        <header className={`mt-5`}>
          <p
            className={`${OrderInfoFeedPopUpStyle.orderId} text text_type_digits-default`}
          >
            <span>#034533</span>
          </p>
          <p className="text text_type_main-medium">
            Death Star Starship Main бургер
          </p>
          <p
            className={`${OrderInfoFeedPopUpStyle.status} text text_type_main-small mt-2`}
          >
            Выполнен
          </p>
        </header>
        <main>
          <p className="text text_type_main-medium mt-10">Состав:</p>
          <div className={`${OrderInfoFeedPopUpStyle.ingredientsWrapper}`}>
            <ul className={`${OrderInfoFeedPopUpStyle.ingredients}`}>
              <li className={`${OrderInfoFeedPopUpStyle.ingredient} mr-2 mb-4`}>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__img}`}
                ></div>
                <p className="text text_type_main-small ml-5">
                  Флуоресцентная булка R2-D3
                </p>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__spacer}`}
                ></div>
                <p className={`text text_type_digits-default mr-2`}>2 x 20</p>
                <CurrencyIcon type="primary" />
              </li>
              <li className={`${OrderInfoFeedPopUpStyle.ingredient} mr-2 mb-4`}>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__img}`}
                ></div>
                <p className="text text_type_main-small ml-5">
                  Флуоресцентная булка R2-D3
                </p>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__spacer}`}
                ></div>
                <p className={`text text_type_digits-default mr-2`}>2 x 20</p>
                <CurrencyIcon type="primary" />
              </li>
              <li className={`${OrderInfoFeedPopUpStyle.ingredient} mr-2 mb-4`}>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__img}`}
                ></div>
                <p className="text text_type_main-small ml-5">
                  Флуоресцентная булка R2-D3
                </p>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__spacer}`}
                ></div>
                <p className={`text text_type_digits-default mr-2`}>2 x 20</p>
                <CurrencyIcon type="primary" />
              </li>

              <li className={`${OrderInfoFeedPopUpStyle.ingredient} mr-2 mb-4`}>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__img}`}
                ></div>
                <p className="text text_type_main-small ml-5">
                  Флуоресцентная булка R2-D3
                </p>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__spacer}`}
                ></div>
                <p className={`text text_type_digits-default mr-2`}>2 x 20</p>
                <CurrencyIcon type="primary" />
              </li>
              <li className={`${OrderInfoFeedPopUpStyle.ingredient} mr-2 mb-4`}>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__img}`}
                ></div>
                <p className="text text_type_main-small ml-5">
                  Флуоресцентная булка R2-D3
                </p>
                <div
                  className={`${OrderInfoFeedPopUpStyle.ingredient__spacer}`}
                ></div>
                <p className={`text text_type_digits-default mr-2`}>2 x 20</p>
                <CurrencyIcon type="primary" />
              </li>
            </ul>
          </div>
        </main>
        <footer className={`${OrderInfoFeedPopUpStyle.footer} mt-8 mb-10`}>
          <p className="text text_type_main-default text_color_inactive">
            Сегодня, 16:20
          </p>
          <div className={OrderInfoFeedPopUpStyle.footer_overallPrice}>
            <p className={`text text_type_digits-default mr-2`}>510</p>
            <CurrencyIcon type="primary" />
          </div>
        </footer>
      </section>
    </div>
  );
};
