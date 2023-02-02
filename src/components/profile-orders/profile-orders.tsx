import React from "react";
import { OrderInFeed } from "../order-in-feed/order-in-feed";
import ProfileOrdersStyle from "./profile-orders.module.css";

export const ProfileOrders = () => {
  return (
    <div className={`${ProfileOrdersStyle.ordersContainer} mr-2 `}>
      <OrderInFeed showStatus />
      <OrderInFeed showStatus />
      <OrderInFeed showStatus />
      <OrderInFeed showStatus />
      <OrderInFeed showStatus />
    </div>
  );
};
