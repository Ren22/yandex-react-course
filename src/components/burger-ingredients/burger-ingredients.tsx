import React from "react";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import burgerIngredients from "./burger-ingredients.module.css";
import { burgersData } from "../../api/burgers";

const BurgerIngredients = () => {
  const breads = burgersData.filter((b) => b.name.includes("булка"));
  const sauce = burgersData.filter((b) => b.name.includes("Соус"));
  const filling = burgersData.filter(
    (b) => !b.name.includes("булка") && !b.name.includes("Соус")
  );
  return (
    <div className={`${burgerIngredients.main} mr-10`}>
      <h3 className="text text_type_main-medium">Булки</h3>
      <ul className={`${burgerIngredients.list} pt-6 pl-4 pb-10`}>
        {breads.map((b, key) => (
          <BurgerIngredientsItem
            key={key}
            img={b.image}
            description={b.name}
            value={b.price}
          />
        ))}
      </ul>
      <h3 className="text text_type_main-medium">Соусы</h3>
      <ul className={`${burgerIngredients.list} pt-6 pl-4 pb-10`}>
        {sauce.map((b, key) => (
          <BurgerIngredientsItem
            key={key}
            img={b.image}
            description={b.name}
            value={b.price}
          />
        ))}
      </ul>
      <h3 className="text text_type_main-medium">Начинки</h3>
      <ul className={`${burgerIngredients.list} pt-6 pl-4 pb-10`}>
        {filling.map((b, key) => (
          <BurgerIngredientsItem
            key={key}
            img={b.image}
            description={b.name}
            value={b.price}
          />
        ))}
      </ul>
    </div>
  );
};
export default BurgerIngredients;
