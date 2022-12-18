import React, { useState } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import listStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addIngredient,
  selectIngredientsState,
} from "../../redux/slices/ingredients";
import {
  postOrder,
  selectOrderState,
  updateTotalSum,
} from "../../redux/slices/order";
import { useAppDispatch } from "../../redux/store";
import { useDrop } from "react-dnd";
import { IngredientDetailsType } from "../../utils/types";
import DraggbleItem from "./draggable-item/draggable-item";

const BurgerConstructor = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { orderId, totalSum } = useSelector(selectOrderState);
  const { bun, others } = useSelector(
    selectIngredientsState
  ).selectedIngredients;
  const isIngredientDragged = useSelector(
    selectIngredientsState
  ).isIngredientDragged;

  const dispatch = useAppDispatch();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredientDetails: IngredientDetailsType) {
      dispatch(addIngredient(ingredientDetails));
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

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

  const outline = isIngredientDragged ? "1px dashed lightgreen" : "transparent";

  return (
    <div className={`${listStyle.container} pl-4 pr-4`}>
      <div ref={dropTarget} style={{ outline }} className={"mt-25"}>
        <li className={`${listStyle.list__item}`}>
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
            <DraggbleItem
              key={i}
              orderIndex={i}
              ingredientDetails={ingredient}
            />
          ))}
        </ul>
        <li className={`${listStyle.list__item}  mb-10`}>
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
      </div>

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
export default BurgerConstructor;
