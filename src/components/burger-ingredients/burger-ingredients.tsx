import React, {
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BurgerIngredientsItem from "./components/burger-ingredients-item/burger-ingredients-item";
import burgerIngredientsStyle from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  loadAllIngredients,
  selectIngredientsState,
} from "../../redux/slices/ingredients";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { INGREDIENT_TYPES } from "../../utils/types";

enum NAV_TYPES {
  BUNS = "buns",
  SAUCES = "sauces",
  FILLINGS = "fillings",
}

const BurgerIngredients = () => {
  const [current, setCurrent] = useState("buns");
  const { allIngredients } = useAppSelector(selectIngredientsState);
  const dispatch = useAppDispatch();
  const burgerIngredientsContainerRef = useRef<HTMLElement>(null);
  const bunsHeaderRef = useRef<HTMLHeadingElement>(null);
  const sauceHeaderRef = useRef<HTMLHeadingElement>(null);
  const fillingsHeaderRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    dispatch(loadAllIngredients());
  }, [dispatch]);

  const buns = useMemo(() => {
    return allIngredients?.filter((b) => b.type === INGREDIENT_TYPES.bun);
  }, [allIngredients]);
  const sauces = useMemo(
    () => allIngredients?.filter((b) => b.type === INGREDIENT_TYPES.sauce),
    [allIngredients]
  );
  const fillings = useMemo(
    () => allIngredients?.filter((b) => b.type === INGREDIENT_TYPES.main),
    [allIngredients]
  );

  const handleScroll = (e: SyntheticEvent) => {
    const containerPos =
      burgerIngredientsContainerRef.current?.getBoundingClientRect();
    const bunsHeaderPos = bunsHeaderRef.current?.getBoundingClientRect();
    const sauceHeaderPos = sauceHeaderRef.current?.getBoundingClientRect();
    const fillingsHeaderPos =
      fillingsHeaderRef.current?.getBoundingClientRect();
    let closestHeaderElement = null;

    if (containerPos && bunsHeaderPos && sauceHeaderPos && fillingsHeaderPos) {
      const allDistances = [
        {
          distance: Math.abs(containerPos.top - bunsHeaderPos?.top),
          id: NAV_TYPES.BUNS,
        },
        {
          distance: Math.abs(containerPos.top - sauceHeaderPos?.top),
          id: NAV_TYPES.SAUCES,
        },
        {
          distance: Math.abs(containerPos.top - fillingsHeaderPos?.top),
          id: NAV_TYPES.FILLINGS,
        },
      ];
      closestHeaderElement = allDistances.sort(
        (a, b) => a.distance - b.distance
      )[0];
    }
    if (!closestHeaderElement) {
      return;
    }
    setCurrent(closestHeaderElement.id);
  };

  return (
    <div className={`${burgerIngredientsStyle.main} pt-6 pl-4 mr-10`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <div className={`${burgerIngredientsStyle.tabs} pb-10`}>
        <Tab
          value={NAV_TYPES.BUNS}
          active={current === NAV_TYPES.BUNS}
          onClick={setCurrent}
        >
          <a
            className={
              current === NAV_TYPES.BUNS
                ? burgerIngredientsStyle.tabs__activeLink
                : ""
            }
            href={`#${NAV_TYPES.BUNS}`}
          >
            Булки
          </a>
        </Tab>
        <Tab
          value={NAV_TYPES.SAUCES}
          active={current === NAV_TYPES.SAUCES}
          onClick={setCurrent}
        >
          <a
            className={
              current === NAV_TYPES.SAUCES
                ? burgerIngredientsStyle.tabs__activeLink
                : ""
            }
            href={`#${NAV_TYPES.SAUCES}`}
          >
            Соусы
          </a>
        </Tab>
        <Tab
          value={NAV_TYPES.FILLINGS}
          active={current === NAV_TYPES.FILLINGS}
          onClick={setCurrent}
        >
          <a
            className={
              current === NAV_TYPES.FILLINGS
                ? burgerIngredientsStyle.tabs__activeLink
                : ""
            }
            href={`#${NAV_TYPES.FILLINGS}`}
          >
            Начинки
          </a>
        </Tab>
      </div>
      <section
        className={burgerIngredientsStyle.listWrapper}
        onScroll={handleScroll}
        ref={burgerIngredientsContainerRef}
      >
        <h3 ref={bunsHeaderRef} className="text text_type_main-medium">
          Булки
        </h3>
        <ul
          id={NAV_TYPES.BUNS}
          className={`${burgerIngredientsStyle.list} pt-6 pl-4 pb-10`}
        >
          {buns.map((b) => (
            <BurgerIngredientsItem key={b._id} ingredientDetails={b} />
          ))}
        </ul>
        <h3 ref={sauceHeaderRef} className="text text_type_main-medium">
          Соусы
        </h3>
        <ul
          id={NAV_TYPES.SAUCES}
          className={`${burgerIngredientsStyle.list} pt-6 pl-4 pb-10`}
        >
          {sauces.map((s) => (
            <BurgerIngredientsItem key={s._id} ingredientDetails={s} />
          ))}
        </ul>
        <h3 ref={fillingsHeaderRef} className="text text_type_main-medium">
          Начинки
        </h3>
        <ul
          id={NAV_TYPES.FILLINGS}
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
