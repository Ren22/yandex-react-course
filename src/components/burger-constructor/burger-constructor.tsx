import React, { useState } from "react";
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import listStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { IngredientDetailsType } from "../burger-ingredients-item/burger-ingredients-item";

interface Props {
  burgersData: IngredientDetailsType[];
}

const OrderList = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { burgersData } = props;
  const ordersSum = burgersData.reduce((p, n) => p + n.price, 0);
  const bread = burgersData.filter((it) => it.name.includes("булка"))[0];
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const modal = (
    <Modal closeModal={handleCloseModal}>
      <OrderDetails orderId={"03456"} />
    </Modal>
  );

  return (
    <div className={`${listStyle.container} pl-4 pr-4`}>
      <li className={`${listStyle.list__item} mt-25`} draggable="true">
        {bread && (
          <ConstructorElement
            isLocked={true}
            type="top"
            text={bread.name + "(верх)"}
            price={bread.price}
            thumbnail={bread.image}
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
        {bread && (
          <ConstructorElement
            isLocked={true}
            type="bottom"
            text={bread.name + "(низ)"}
            price={bread.price}
            thumbnail={bread.image}
          />
        )}
      </li>

      <section className={listStyle.bottom}>
        <span className="text text_type_digits-medium">{ordersSum}</span>
        <span className="text text_type_main-large ml-1 mr-10">
          <CurrencyIcon type="primary" />
        </span>
        <Button
          onClick={handleOpenModal}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </section>
      {isModalVisible && modal}
    </div>
  );
};
export default OrderList;
