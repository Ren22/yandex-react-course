import React, { useMemo, useState } from "react";
import BurgerIngredientsItem from "../burger-ingredients-item/burger-ingredients-item";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientDetailsType } from "../../utils/types";

interface Props {
  burgersData: IngredientDetailsType[];
}

const BurgerIngredients = ({ burgersData }: Props) => {
  const [current, setCurrent] = useState("Breads");
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
        <Tab value="Breads" active={current === "Breads"} onClick={setCurrent}>
          <a
            className={
              current === "Breads"
                ? burgerIngredientsStyle.tabs__activeLink
                : ""
            }
            href="#buns"
          >
            Булки
          </a>
        </Tab>
        <Tab value="Sauces" active={current === "Sauces"} onClick={setCurrent}>
          <a
            className={
              current === "Sauces"
                ? burgerIngredientsStyle.tabs__activeLink
                : ""
            }
            href="#sauces"
          >
            Соусы
          </a>
        </Tab>
        <Tab
          value="Fillings"
          active={current === "Fillings"}
          onClick={setCurrent}
        >
          <a
            className={
              current === "Fillings"
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
