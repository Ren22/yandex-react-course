import React, { useEffect, useState } from "react";
import { ORDERS_URL_BASE } from "../../api";
import {
  loadAllIngredients,
  selectIngredientsState,
} from "../../redux/slices/ingredients";
import {
  OrderDetails,
  selectOrders,
  wsInit,
} from "../../redux/slices/orders-feed";
import { getUserDataReducer } from "../../redux/slices/user";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { shearBearerInToken, getCookie } from "../../utils/cookieHandler";
import { OrderInFeed } from "../order-in-feed/order-in-feed";
import ProfileOrdersStyle from "./profile-orders.module.css";

export const ProfileOrders = () => {
  const dispatch = useAppDispatch();
  const userOrders = useAppSelector(selectOrders);
  const [userOrdersReversed, setUserOrdersReversed] = useState<OrderDetails[]>(
    []
  );
  const { allIngredients } = useAppSelector(selectIngredientsState);

  useEffect(() => {
    setUserOrdersReversed(userOrders ? [...userOrders].reverse() : []);
  }, [userOrders]);

  useEffect(() => {
    dispatch(loadAllIngredients());
    dispatch(getUserDataReducer()).then(() =>
      dispatch(
        wsInit(
          `wss://${ORDERS_URL_BASE}?token=${shearBearerInToken(
            getCookie("accessToken")
          )}`
        )
      )
    );
  }, [dispatch]);

  return (
    <div className={`${ProfileOrdersStyle.ordersContainer} mr-2 `}>
      {userOrdersReversed.map((order) => (
        <OrderInFeed
          showStatus={false}
          allIngredients={allIngredients}
          {...order}
        />
      ))}
    </div>
  );
};
