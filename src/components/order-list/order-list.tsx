import React from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { burgersData } from "../../api/burgers";
import listStyle from "./order-list.module.css";

const orderList = () => {
  const lockedOrdes = [0, burgersData.length];
  const ordersSum = burgersData.reduce((p, n) => p + n.price, 0);
  return (
    <div className={`${listStyle.container} pl-4 pr-4`}>
      <ul className={`${listStyle.list} mt-25 mb-10`}>
        {burgersData.map((b, i) => (
          <li className={listStyle.list__item} draggable="true">
            {i > 0 && i < burgersData.length - 1 && <DragIcon type="primary" />}
            <ConstructorElement
              type={`${
                i === 0 ? "top" : i === burgersData.length - 1 ? "bottom" : ""
              }`}
              key={i}
              isLocked={lockedOrdes.includes(i)}
              text={b.name}
              price={b.price}
              thumbnail={b.image}
            />
          </li>
        ))}
      </ul>
      <section className={listStyle.bottom}>
        <span className="text text_type_digits-medium">{ordersSum}</span>
        <span className="text text_type_main-large ml-1 mr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </section>
    </div>
  );
};
export default orderList;
