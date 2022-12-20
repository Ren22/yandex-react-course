import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import type { Identifier } from "dnd-core";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  moveIngredients,
  removeIngredient,
} from "../../../redux/slices/ingredients";
import { useAppDispatch } from "../../../redux/store";
import { IngredientDetailsType } from "../../../utils/types";
import listStyle from "../burger-constructor.module.css";

interface Props {
  ingredientDetails: IngredientDetailsType;
  orderIndex: number;
}

interface DragItem {
  orderIndex: number;
  id: string;
  type: string;
}

const ACCEPTED_TYPE = "selectedIngredient";

const DraggbleItem = ({ ingredientDetails, orderIndex }: Props) => {
  const { name, price, image } = ingredientDetails;
  const ref = useRef<HTMLDivElement>(null);
  const [, dragRef] = useDrag({
    type: ACCEPTED_TYPE,
    item: { ingredientDetails, orderIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const dispatch = useAppDispatch();
  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ACCEPTED_TYPE,
    hover(item: DragItem) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.orderIndex;
      const hoverIndex = orderIndex;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Time to actually perform the action
      if (dragIndex !== undefined && hoverIndex !== undefined) {
        dispatch(moveIngredients({ dragIndex, hoverIndex }));
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.orderIndex = hoverIndex;
      }
    },
  });

  dragRef(drop(ref));

  const handleIngredientRemoval = (position: number) => () => {
    dispatch(removeIngredient(position));
  };

  return (
    <div ref={ref}>
      <li className={listStyle.list__item}>
        <DragIcon type="primary" />
        <ConstructorElement
          text={name}
          price={price}
          thumbnail={image}
          handleClose={handleIngredientRemoval(orderIndex)}
        />
      </li>
    </div>
  );
};

export default DraggbleItem;
