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
  const ordersSum = burgersData.reduce((p, n) => p + n.price, 0);
  const breads = burgersData.filter((it) => it.name.includes("булка"));
  const topBread = breads.splice(0, 1)[0];
  const bottomBread = breads.pop();

  return (
    <div className={`${listStyle.container} pl-4 pr-4`}>
      <li className={`${listStyle.list__item} mt-25`} draggable="true">
        {topBread && (
          <ConstructorElement
            isLocked={true}
            type="top"
            text={topBread.name}
            price={topBread.price}
            thumbnail={topBread.image}
          />
        )}
      </li>
      <ul className={`${listStyle.list}`}>
        {burgersData.slice(1, burgersData.length - 1).map((b, i) => (
          <li className={listStyle.list__item} draggable="true">
            <DragIcon type="primary" />
            <ConstructorElement
              key={i}
              text={b.name}
              price={b.price}
              thumbnail={b.image}
            />
          </li>
        ))}
      </ul>
      <li className={`${listStyle.list__item}  mb-10`} draggable="true">
        {bottomBread && (
          <ConstructorElement
            isLocked={true}
            type="bottom"
            text={bottomBread.name}
            price={bottomBread.price}
            thumbnail={bottomBread.image}
          />
        )}
      </li>

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
