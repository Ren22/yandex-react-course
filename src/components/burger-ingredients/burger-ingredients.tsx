import React, { useMemo, useState, useContext } from "react";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientsContext } from "../../services/ingredientsContext";

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("breads");
  const { burgersData } = useContext(IngredientsContext);
  const buns = useMemo(
    () => burgersData?.filter((b) => b.type === "bun"),
    [burgersData]
  );
  const sauces = useMemo(
    () => burgersData?.filter((b) => b.type === "sauce"),
    [burgersData]
  );
  const fillings = useMemo(
    () => burgersData?.filter((b) => b.type === "main"),
    [burgersData]
  );

  return (
    <div className={`${burgerIngredientsStyle.main} pt-6 pl-4 mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div
        onClick={(e) => console.log(e)}
        className={`${burgerIngredientsStyle.tabs} pb-10`}
      >
        <Tab value="breads" active={current === "breads"} onClick={setCurrent}>
          <a
            className={
              current === "breads"
                ? burgerIngredientsStyle.tabs__activeLink
                : ""
            }
            href="#buns"
          >
            Булки
          </a>
        </Tab>
        <Tab value="sauces" active={current === "sauces"} onClick={setCurrent}>
          <a
            className={
              current === "sauces"
                ? burgerIngredientsStyle.tabs__activeLink
                : ""
            }
            href="#sauces"
          >
            Соусы
          </a>
        </Tab>
        <Tab
          value="fillings"
          active={current === "fillings"}
          onClick={setCurrent}
        >
          <a
            className={
              current === "fillings"
                ? burgerIngredientsStyle.tabs__activeLink
                : ""
            }
            href="#fillings"
          >
            Начинки
          </a>
        </Tab>
      </div>
      <section className={burgerIngredientsStyle.listWrapper}>
        <h3 className="text text_type_main-medium">Булки</h3>
        <ul
          id="buns"
          className={`${burgerIngredientsStyle.list} pt-6 pl-4 pb-10`}
        >
          {buns.map((b) => (
            <BurgerIngredientsItem key={b._id} ingredientDetails={b} />
          ))}
        </ul>
        <h3 className="text text_type_main-medium">Соусы</h3>
        <ul
          id="sauces"
          className={`${burgerIngredientsStyle.list} pt-6 pl-4 pb-10`}
        >
          {sauces.map((s) => (
            <BurgerIngredientsItem key={s._id} ingredientDetails={s} />
          ))}
        </ul>
        <h3 className="text text_type_main-medium">Начинки</h3>
        <ul
          id="fillings"
          className={`${burgerIngredientsStyle.list} pt-6 pl-4 pb-10`}
        >
          {fillings.map((f) => (
            <BurgerIngredientsItem key={f._id} ingredientDetails={f} />
          ))}
        </ul>
      </section>
    </div>
  );
};
export default BurgerIngredients;
