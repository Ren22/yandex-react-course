import React from "react";
import OrderDetailsStyle from "./order-details.module.css";

type Props = {
  orderId: string;
};

const OrderDetails = ({ orderId }: Props) => {
  return (
    <section className={`${OrderDetailsStyle.main} mt-5`}>
      <span className={`${OrderDetailsStyle} text text_type_digits-large`}>
        {orderId}
      </span>
      <span className={`mt-8 mb-15 text text_type_main-medium`}>
        идентификатор заказа
      </span>
      <section className={`${OrderDetailsStyle.readyIcon} mb-15`} />
      <span className="text text_type_main-default">
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности вашего заказа
      </span>
    </section>
  );
};

export default OrderDetails;
