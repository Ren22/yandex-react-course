import React, { useMemo } from "react";
import { OrderInFeed } from "../../components/order-in-feed/order-in-feed";
import feedPageStyle from "./feed.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  selectOrders,
  selectTotalOrders,
  selectTotalOrdersToday,
  wsClose,
  wsInit,
} from "../../redux/slices/orders-feed";
import { useEffect, useState } from "react";
import { selectIngredientsState } from "../../redux/slices/ingredients";
import { chunkArray } from "../../utils/chunkArray";
import { ORDER_STATUS } from "../../components/order-info-feed-popup/order-info-feed-popup";
import { ORDERS_URL_BASE } from "../../api";
import { OrderDetailsType } from "../../types/feed";

const ROWS_PER_COLUMN_IN_READY_STATE = 12;

export const FeedPage = () => {
  const dispatch = useAppDispatch();
  const totalOrders = useAppSelector(selectTotalOrders);
  const ordersToday = useAppSelector(selectTotalOrdersToday);
  const allOrders = useAppSelector(selectOrders);
  const { allIngredients } = useAppSelector(selectIngredientsState);
  const [doneOrdersChunks, setDoneOrdersChunks] = useState<
    OrderDetailsType[][] | null
  >(null);

  useMemo(() => {
    const doneOrders = allOrders?.filter(
      (order) => order.status === ORDER_STATUS.DONE
    );
    if (doneOrders?.length) {
      setDoneOrdersChunks(
        chunkArray(doneOrders, ROWS_PER_COLUMN_IN_READY_STATE)
      );
    }
  }, [allOrders]);

  useEffect(() => {
    dispatch(wsInit(`wss://${ORDERS_URL_BASE}/all?`));

    const handleClose = () => dispatch(wsClose());

    return () => {
      handleClose();
    };
  }, [dispatch]);

  return (
    <>
      <main className={feedPageStyle.main}>
        <section className={feedPageStyle.leftColumn}>
          <h1 className="text text_type_main-large mt-10 mb-5">
            Лента заказов
          </h1>
          <div className={`${feedPageStyle.ordersContainer} mr-2 `}>
            {allOrders?.map((order, i) => (
              <OrderInFeed
                key={i}
                showStatus={false}
                allIngredients={allIngredients}
                {...order}
              />
            ))}
          </div>
        </section>
        <section className={`${feedPageStyle.rightColumn} mt-25 ml-10`}>
          <div className={`${feedPageStyle.ordersStatusWrapper}`}>
            <div
              className={`${feedPageStyle.ordersStatus__readyOrdersWrapper}`}
            >
              <p className="text text_type_main-medium mb-5">Готовы:</p>
              <div className={`${feedPageStyle.ordersStatus__readyOrders}`}>
                {doneOrdersChunks?.map((ordersChunks, i) => (
                  <div key={i} className=" mr-4">
                    {ordersChunks.map((order, j) => (
                      <p
                        key={j}
                        className={`${feedPageStyle.readyOrders__number} text text_type_digits-default`}
                      >
                        {order.number}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text text_type_main-medium mb-5">В работе:</p>
              {allOrders
                ?.filter((order) => order.status !== "done")
                .map((it, i) => (
                  <p
                    key={i}
                    className={`${feedPageStyle.readyOrders__number} text text_type_digits-default`}
                  >
                    {it.number}
                  </p>
                ))}
            </div>
          </div>
          <div className={`${feedPageStyle.doneOverall}`}>
            <p className="text text_type_main-medium mt-5">
              Выполнено за все время:
            </p>
            <p className="text text_type_digits-medium">{totalOrders}</p>
          </div>
          <div className={`${feedPageStyle.doneToday}`}>
            <p className="text text_type_main-medium">Выполнено за сегодня:</p>
            <p className="text text_type_digits-medium">{ordersToday}</p>
          </div>
        </section>
      </main>
    </>
  );
};
