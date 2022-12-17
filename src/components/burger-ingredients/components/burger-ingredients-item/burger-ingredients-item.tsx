import React, { useState, useCallback, useEffect } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyle from "./burger-ingredients-item.module.css";
import Modal from "../../../modal/modal";
import IngredientDetails from "../../../ingredient-details/ingredient-details";
import { IngredientDetailsType } from "../../../../utils/types";
import {
  addIngredient,
  closeIngredientDetails,
  pickIngredient,
  selectIngredientsState,
} from "../../../../redux/slices/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";

interface Props {
  ingredientDetails: IngredientDetailsType;
}

const BurgerIngredientsItem = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { image, name, price, _id } = props.ingredientDetails;
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: props.ingredientDetails,
  });
  const { selectedIngredients } = useSelector(selectIngredientsState);
  const dispatch = useDispatch();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // we reset the counter every time selected ingredients are updated
    setCount(null);
    let count = null;
    if (selectedIngredients.bun?._id === _id) {
      setCount(1);
      return;
    }
    count = selectedIngredients.others.filter((it) => it._id === _id);
    if (count.length > 0) {
      setCount(count.length);
    }
  }, [_id, selectedIngredients]);

  const handleOpenModal = useCallback(() => {
    setIsModalVisible(true);
    dispatch(pickIngredient(props.ingredientDetails));
    dispatch(addIngredient(props.ingredientDetails));
  }, [dispatch, props.ingredientDetails]);

  const handleCloseModal = () => {
    dispatch(closeIngredientDetails());
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible && (
        <Modal header="Детали ингредиента" closeModal={handleCloseModal}>
          <IngredientDetails ingredientDetails={props.ingredientDetails} />
        </Modal>
      )}
      <li
        ref={dragRef}
        onClick={handleOpenModal}
        className={`${burgerIngredientStyle.item} text text_type_main-default`}
      >
        {count && <Counter count={count} />}
        <img className="pl-4 pr-4" alt={"bulka-item"} src={image} />
        <div className={`${burgerIngredientStyle.price} mb-1 mt-1`}>
          <span className="mr-2">{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={burgerIngredientStyle.description}>{name}</p>
      </li>
    </>
  );
};
export default BurgerIngredientsItem;
