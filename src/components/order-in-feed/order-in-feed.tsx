import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FC, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { setSelectedOrderInFeed } from "../../redux/slices/orders-feed";
import { useAppDispatch } from "../../redux/store";
import { OrderDetailsType } from "../../types/feed";
import { IngredientDetailsType } from "../../utils/types";
import { ROUTES } from "../app/app";
import { ORDER_STATUS } from "../order-info-feed-popup/order-info-feed-popup";
import OrderInFeedStyle from "./order-in-feed.module.css";

const MAX_INGREDIENTS_PICTOGRAMS = 5;

type Props = OrderDetailsType & {
  showStatus?: boolean;
  allIngredients: IngredientDetailsType[];
};

export const OrderInFeed: FC<Props> = (props) => {
  const {
    createdAt,
    ingredients,
    name,
    number,
    status,
    showStatus,
    allIngredients,
  } = props;
  const location = useLocation();
  const dispatch = useAppDispatch();

  const detailedIngredients = useMemo(() => {
    return ingredients.map((ingredient) => {
      const ing = allIngredients.find((it) => it._id === ingredient);
      if (!ing) throw new Error("Cannot find detailed ingredient infomation");
      return ing;
    });
  }, [allIngredients, ingredients]);

  const ingredientsSum = useCallback(() => {
    let sum: number = 0;
    detailedIngredients.forEach((ingredient) => (sum += ingredient.price));
    return sum === 0 ? "Not calculatble" : sum;
  }, [detailedIngredients]);

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

  const handleOrderStatus = () => {
    switch (status) {
      case ORDER_STATUS.CREATED:
        return "Создан";
      case ORDER_STATUS.DONE:
        return "Выполнен";
      case ORDER_STATUS.PENDING:
        return "Готовится";
      default:
        break;
    }
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
              className={`${
                status === ORDER_STATUS.DONE
                  ? OrderInFeedStyle.status_done
                  : OrderInFeedStyle.status
              } text text_type_main-small mt-2 `}
            >
              {handleOrderStatus()}
            </p>
          )}
        </main>
        <footer className={`${OrderInFeedStyle.footer} mt-4`}>
          <section className={`${OrderInFeedStyle.footer__ingredients}`}>
            {detailedIngredients.map((ingredient, i) => {
              if (i > MAX_INGREDIENTS_PICTOGRAMS + 1) return null;
              return i < MAX_INGREDIENTS_PICTOGRAMS ? (
                <div
                  key={i}
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
                  key={i}
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
