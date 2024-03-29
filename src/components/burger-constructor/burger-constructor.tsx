import React, { useEffect, useMemo } from "react";
import {
  ConstructorElement,
  CurrencyIcon,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import listStyle from "./burger-constructor.module.css";
import Modal from "../modal/modal";
import OrderDetails from "../order-details-popup/order-details-popup";
import {
  addIngredient,
  selectIsIngredientDragged,
  selectSelectedIngredients,
} from "../../redux/slices/ingredients";
import {
  postOrder,
  selectOrderState,
  setOrderToNull,
} from "../../redux/slices/order";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useDrop } from "react-dnd";
import { IngredientDetailsType } from "../../utils/types";
import DraggbleItem from "./draggable-item/draggable-item";
import { selectUser, getUserDataReducer } from "../../redux/slices/user";
import { ROUTES } from "../app/app";
import { useHistory } from "react-router-dom";

const BurgerConstructor = () => {
  const { orderId } = useAppSelector(selectOrderState);
  const { bun, others } = useAppSelector(selectSelectedIngredients);
  const isIngredientDragged = useAppSelector(selectIsIngredientDragged);
  const history = useHistory();

  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredientDetails: IngredientDetailsType) {
      dispatch(addIngredient(ingredientDetails));
    },
  });

  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(getUserDataReducer());
  }, [dispatch]);

  const totalSum = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      (others ? others.reduce((p, n) => p + n.price, 0) : 0),
    [bun, others]
  );

  const handleOpenModal = async () => {
    if (!user) {
      history.push({ pathname: `${ROUTES.LOGIN}` });
      return;
    }
    if (totalSum === 0) {
      alert("Nothing was selected!");
      return;
    }
    const ingredientIdsToSubmit = others?.map((it) => it._id);
    if (bun) {
      ingredientIdsToSubmit?.unshift(bun._id);
      ingredientIdsToSubmit?.push(bun._id);
    }
    if (ingredientIdsToSubmit) {
      dispatch(postOrder(ingredientIdsToSubmit));
    }
  };

  const handleCloseModal = () => {
    dispatch(setOrderToNull());
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
      {orderId && (
        <Modal closeModal={handleCloseModal}>
          <OrderDetails orderId={orderId} />
        </Modal>
      )}
    </div>
  );
};
export default BurgerConstructor;
