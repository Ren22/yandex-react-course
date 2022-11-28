import React, { useState } from "react";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import burgerIngredients from "./burger-ingredients.module.css";
import { burgersData } from "../../api/burgers";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("one");
  const breads = burgersData.filter((b) => b.name.includes("булка"));
  const sauce = burgersData.filter((b) => b.name.includes("Соус"));
  const filling = burgersData.filter(
    (b) => !b.name.includes("булка") && !b.name.includes("Соус")
  );
  return (
    <div className={`${burgerIngredients.main}`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      {/* Ниже часть не работает Uncaught TypeError: Cannot read properties of null (reading 'useCallback') */}
      {/* <div style={{ display: "flex" }}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          One
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Three
        </Tab>
      </div> */}
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
