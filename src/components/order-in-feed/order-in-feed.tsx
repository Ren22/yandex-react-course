import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  OrderDetails,
  setSelectedOrderInFeed,
} from "../../redux/slices/orders-feed";
import { useAppDispatch } from "../../redux/store";
import { IngredientDetailsType } from "../../utils/types";
import { ROUTES } from "../app/app";
import OrderInFeedStyle from "./order-in-feed.module.css";

type Props = OrderDetails & {
  showStatus?: boolean;
  allIngredients: IngredientDetailsType[];
};

export const OrderInFeed = (props: Props) => {
  const {
    createdAt,
    ingredients,
    name,
    number,
    status,
    updatedAt,
    _id,
    showStatus,
    allIngredients,
  } = props;
  const location = useLocation();
  const [detailedIngredients, setDetailedIngredients] = useState<
    IngredientDetailsType[]
  >([]);
  const dispatch = useAppDispatch();

  useMemo(() => {
    setDetailedIngredients([]);
    ingredients.forEach((ingredient) => {
      const ing = allIngredients.find((it) => it._id === ingredient);
      if (ing)
        setDetailedIngredients((detailedIngredients) => [
          ...detailedIngredients,
          ing,
        ]);
    });
  }, [allIngredients, ingredients]);

  const ingredientsSum = () => {
    let sum: number = 0;
    detailedIngredients.forEach((ingredient) => (sum += ingredient.price));
    return sum === 0 ? "Not calculatble" : sum;
  };

  const handleClick = () => {
    dispatch(
      setSelectedOrderInFeed({
        ingredients: detailedIngredients,
        number,
        createdAt,
        status,
        name,
      })
    );
  };

  return (
    <Link
      onClick={handleClick}
      to={{
        pathname: `${ROUTES.PROFILE}${ROUTES.ORDERS}/${1}`,
        state: {
          background: location,
        },
      }}
    >
      <div className={`${OrderInFeedStyle.order} pt-4 pb-4 pl-4 pr-4 mb-4`}>
        <header className={`${OrderInFeedStyle.header} mb-4`}>
          <p className="text text_type_digits-default">{`#${number}`}</p>
          <p className="text text_type_main-default text_color_inactive">
            {new Date(createdAt).toLocaleString()}
          </p>
        </header>
        <main>
          <p className="text text_type_main-medium">{name}</p>
          {showStatus && (
            <p
              className={`${OrderInFeedStyle.status} text text_type_main-small mt-2`}
            >
              Выполнен
            </p>
          )}
        </main>
        <footer className={`${OrderInFeedStyle.footer} mt-4`}>
          <section className={`${OrderInFeedStyle.footer__ingredients}`}>
            {detailedIngredients.map((ingredient, i) => {
              if (i >= 6) return null;
              return i < 5 ? (
                <div
                  style={{ zIndex: ingredients.length - i }}
                  className={OrderInFeedStyle.footer__ingredient_border}
                >
                  <img
                    className={`${OrderInFeedStyle.footer__ingredient_content}`}
                    alt={"ingredient representation"}
                    src={`${ingredient.image}`}
                  />
                </div>
              ) : (
                <div
                  style={{ zIndex: ingredients.length - i }}
                  className={OrderInFeedStyle.footer__ingredient_border}
                >
                  <img
                    style={{ zIndex: 0 }}
                    className={`${OrderInFeedStyle.footer__ingredient_content}`}
                    alt={"more than 5 items is provided to the order"}
                    src={`${ingredient.image}`}
                  />
                  <p
                    style={{ opacity: 1 }}
                    className={`text text_type_digits-default ${OrderInFeedStyle.footer__ingredient_contentLast}`}
                  >
                    +{ingredients.length - 5}
                  </p>
                </div>
              );
            })}
          </section>
          <div className={`${OrderInFeedStyle.footer__price}`}>
            <p className="text text_type_digits-default mr-2">
              {ingredientsSum()}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </footer>
      </div>
    </Link>
  );
};
