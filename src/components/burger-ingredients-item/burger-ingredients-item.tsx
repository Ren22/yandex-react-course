import React from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredient from "./burger-ingredients-item.module.css";

interface Props {
  value: number;
  description: string;
  img: string;
}

const burgerIngredientItem = (props: Props) => {
  return (
    <>
      <li className={`${burgerIngredient.item} text text_type_main-default`}>
        <Counter count={1} />
        <img className="pl-4 pr-4" alt={"bulka-item"} src={props.img} />
        <div className={`${burgerIngredient.value} mb-1 mt-1`}>
          <span className="mr-2">{props.value}</span>
          <CurrencyIcon type="primary" />
        </div>
        <p className={burgerIngredient.description}>{props.description}</p>
      </li>
    </>
  );
};
export default burgerIngredientItem;
