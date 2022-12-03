import React from "react";
import { IngredientDetailsType } from "../burger-ingredients-item/burger-ingredients-item";
import ingredientDetailsStyle from "./ingredient-details.module.css";

interface Props {
  ingredientDetails: IngredientDetailsType;
}

const IngredientDetails = (props: Props) => {
  const { image, name, fat, calories, proteins, carbohydrates } =
    props.ingredientDetails;

  const footerDetails = [
    {
      name: "Калории, ккал",
      value: calories,
    },
    {
      name: "Белки, г",
      value: proteins,
    },
    {
      name: "Жиры, г",
      value: fat,
    },
    {
      name: "Углеводы, г",
      value: carbohydrates,
    },
  ];
  return (
    <div className={ingredientDetailsStyle.main}>
      <img
        className={ingredientDetailsStyle.main__image}
        alt={name}
        src={image}
      />
      <span className="text text_type_main-medium mt-4 mb-8">{name}</span>
      <section
        style={{ gap: "20px" }}
        className={`${ingredientDetailsStyle.footer} text text_type_main-default text_color_inactive mb-15`}
      >
        {footerDetails.map((it, key) => {
          return (
            <div
              key={key}
              className={ingredientDetailsStyle.footer__subsection}
            >
              <span>{it.name}</span>
              {it.value}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default IngredientDetails;
