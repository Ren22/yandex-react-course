import React, { useState } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyle from "./burger-ingredients-item.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { IngredientDetailsType } from "../../utils/types";

interface Props {
  ingredientDetails: IngredientDetailsType;
}

const BurgerIngredientsItem = (props: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { image, name, price } = props.ingredientDetails;

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
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
        onClick={handleOpenModal}
        className={`${burgerIngredientStyle.item} text text_type_main-default`}
      >
        <Counter count={1} />
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
