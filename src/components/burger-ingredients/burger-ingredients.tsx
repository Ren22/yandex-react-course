import React, { useState } from "react";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import burgerIngredients from "./burger-ingredients.module.css";
import { burgersData } from "../../api/burgers";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("Breads");
  const breads = burgersData.filter((b) => b.name.includes("булка"));
  const sauce = burgersData.filter((b) => b.name.includes("Соус"));
  const filling = burgersData.filter(
    (b) => !b.name.includes("булка") && !b.name.includes("Соус")
  );
  return (
    <div className={`${burgerIngredients.main} pt-6 pl-4 mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${burgerIngredients.tabs} pb-10`}>
        <Tab value="Breads" active={current === "Breads"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Sauces" active={current === "Sauces"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Fillings"
          active={current === "Fillings"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <section className={burgerIngredients.listWrapper}>
        <h3 className="text text_type_main-medium">Булки</h3>
        <ul className={`${burgerIngredients.list} pt-6 pl-4 pb-10`}>
          {breads.map((b, key) => (
            <BurgerIngredientsItem key={key} ingredientDetails={b} />
          ))}
        </ul>
        <h3 className="text text_type_main-medium">Соусы</h3>
        <ul className={`${burgerIngredients.list} pt-6 pl-4 pb-10`}>
          {sauce.map((b, key) => (
            <BurgerIngredientsItem key={key} ingredientDetails={b} />
          ))}
        </ul>
        <h3 className="text text_type_main-medium">Начинки</h3>
        <ul className={`${burgerIngredients.list} pt-6 pl-4 pb-10`}>
          {filling.map((b, key) => (
            <BurgerIngredientsItem key={key} ingredientDetails={b} />
          ))}
        </ul>
      </section>
    </div>
  );
};
export default BurgerIngredients;
