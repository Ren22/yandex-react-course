import React, { useState, useEffect } from "react";
import {
  Counter,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientStyle from "./burger-ingredients-item.module.css";
import { IngredientDetailsType } from "../../../../utils/types";
import {
  changeDraggingIngredientState,
  selectIngredientsState,
} from "../../../../redux/slices/ingredients";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../app/app";

interface Props {
  ingredientDetails: IngredientDetailsType;
}

const BurgerIngredientsItem = (props: Props) => {
  const { image, name, price, _id } = props.ingredientDetails;
  const [{ isDragging }, dragRef] = useDrag({
    type: "ingredient",
    item: props.ingredientDetails,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
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

  useEffect(() => {
    dispatch(changeDraggingIngredientState(isDragging));
  }, [dispatch, isDragging]);

  return (
    <>
      <Link
        to={{
          pathname: `${ROUTES.INGREDIENTS}/${props.ingredientDetails._id}`,
          state: { prevPath: "/" },
        }}
      >
        <li
          ref={dragRef}
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
      </Link>
    </>
  );
};
export default BurgerIngredientsItem;
