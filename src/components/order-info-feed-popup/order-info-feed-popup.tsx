import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import { selectSelectedOrderInFeed } from "../../redux/slices/orders-feed";
import { useAppSelector } from "../../redux/store";
import { IngredientDetailsType } from "../../utils/types";
import OrderInfoFeedPopUpStyle from "./order-info-feed-popup.module.css";

export enum ORDER_STATUS {
  DONE = "done",
}

export interface IngredientDetailsTypeWithCount extends IngredientDetailsType {
  count: number;
}

export const OrderInfoFeedPopUp = () => {
  const order = useAppSelector(selectSelectedOrderInFeed);
  const [uniqueAndCountedIngredients, setUniqueAndCountedIngredients] =
    useState<IngredientDetailsTypeWithCount[]>();

  useEffect(() => {
    const res = new Map<string, IngredientDetailsTypeWithCount>();
    order?.ingredients.forEach((ingredient) => {
      if (!res.has(ingredient._id)) {
        res.set(ingredient._id, { ...ingredient, count: 1 });
      } else {
        const currCount = res.get(ingredient._id)?.count;
        if (typeof currCount !== "number") {
          throw new Error("Count should be a number type");
        }
        res.set(ingredient._id, {
          ...ingredient,
          count: currCount + 1,
        });
      }
    });
    let vals = Array.from(
      res.values()
    ) as unknown as IngredientDetailsTypeWithCount[];
    setUniqueAndCountedIngredients(vals);
  }, [order]);

  const calculateTotalVal = () =>
    uniqueAndCountedIngredients?.reduce((p, n) => p + n.price * n.count, 0);

  return (
    <div className={`${OrderInfoFeedPopUpStyle.wrapper}`}>
      <section className={`${OrderInfoFeedPopUpStyle.content} pl-10 pr-10`}>
        <header className={`mt-5`}>
          <p
            className={`${OrderInfoFeedPopUpStyle.orderId} text text_type_digits-default`}
          >
            <span>#{order?.number}</span>
          </p>
          <p className="text text_type_main-medium">{order?.name}</p>
          <p
            className={`${OrderInfoFeedPopUpStyle.status} text text_type_main-small mt-2`}
          >
            {order?.status === ORDER_STATUS.DONE ? "Выполнен" : "Готовится"}
          </p>
        </header>
        <main>
          <p className="text text_type_main-medium mt-10">Состав:</p>
          <div className={`${OrderInfoFeedPopUpStyle.ingredientsWrapper}`}>
            <ul className={`${OrderInfoFeedPopUpStyle.ingredients}`}>
              {uniqueAndCountedIngredients?.map((ingredient) => (
                <li
                  className={`${OrderInfoFeedPopUpStyle.ingredient} mr-2 mb-4`}
                >
                  <div className={OrderInfoFeedPopUpStyle.ingredient_border}>
                    <img
                      className={`${OrderInfoFeedPopUpStyle.ingredient_content}`}
                      alt={`${ingredient.name} mini represnation`}
                      src={`${ingredient.image}`}
                    />
                  </div>
                  <p className="text text_type_main-small ml-5">
                    {ingredient.name}
                  </p>
                  <div
                    className={`${OrderInfoFeedPopUpStyle.ingredient__spacer}`}
                  ></div>
                  <p className={`text text_type_digits-default mr-2`}>
                    {ingredient.count} x {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </li>
              ))}
            </ul>
          </div>
        </main>
        <footer className={`${OrderInfoFeedPopUpStyle.footer} mt-8 mb-10`}>
          <p className="text text_type_main-default text_color_inactive">
            {new Date(order?.createdAt ?? "").toLocaleString()}
          </p>
          <div className={OrderInfoFeedPopUpStyle.footer_overallPrice}>
            <p className={`text text_type_digits-default mr-2`}>
              {calculateTotalVal()}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </footer>
      </section>
    </div>
  );
};
