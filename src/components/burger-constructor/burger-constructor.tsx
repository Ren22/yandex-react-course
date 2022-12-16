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
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIngredientsState } from "../../redux/slices/ingredients";
import {
  postOrder,
  selectOrderState,
  updateTotalSum,
} from "../../redux/slices/order";
import { useAppDispatch } from "../../redux/store";

const OrderList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { orderId, totalSum } = useSelector(selectOrderState);
  const { bun, others } = useSelector(
    selectIngredientsState
  ).selectedIngredients;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const newSum =
      (bun ? bun.price * 2 : 0) +
      (others ? others.reduce((p, n) => p + n.price, 0) : 0);
    dispatch(updateTotalSum(newSum));
  }, [bun, dispatch, others]);

  const handleOpenModal = async () => {
    const ingredientIdsToSubmit = others?.map((it) => it._id);
    if (bun) {
      ingredientIdsToSubmit?.push(bun._id);
    }
    if (ingredientIdsToSubmit) {
      dispatch(postOrder(ingredientIdsToSubmit));
      setIsModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`${listStyle.container} pl-4 pr-4`}>
      <li className={`${listStyle.list__item} mt-25`} draggable="true">
        {bun && (
          <ConstructorElement
            isLocked={true}
            type="top"
            text={bun.name + "(верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </li>
      <ul className={`${listStyle.list}`}>
        {others?.map((ingredient, i) => (
          <li key={i} className={listStyle.list__item} draggable="true">
            <DragIcon type="primary" />
            <ConstructorElement
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
            />
          </li>
        ))}
      </ul>
      <li className={`${listStyle.list__item}  mb-10`} draggable="true">
        {bun && (
          <ConstructorElement
            isLocked={true}
            type="bottom"
            text={bun.name + "(низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </li>

      <section className={listStyle.bottom}>
        <span className="text text_type_digits-medium">{totalSum}</span>
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
      {isModalVisible && (
        <Modal closeModal={handleCloseModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </div>
  );
};
export default OrderList;
