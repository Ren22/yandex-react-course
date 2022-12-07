import React, { useEffect, useReducer, useState } from "react";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Header from "../../components/header/header";
import appStyle from "./app.module.css";
import OrderList from "../burger-constructor/burger-constructor";
import { getBurgersData } from "../../api/burgers";
import { IngredientDetailsType } from "../../utils/types";
import {
  IngredientsContext,
  BurgerConstructorContext,
} from "../../services/ingredientsContext";
import { TotalSumContext } from "../../services/totalSumContext";

export interface TotalSum {
  value: number;
}

const reducer = (
  state: TotalSum,
  action: { type: string; payload: TotalSum }
) => {
  const { type, payload } = action;
  switch (type) {
    case "updateTotalSum":
      return { ...state, value: payload.value };
    default:
      return state;
  }
};

const App = () => {
  const [burgersData, setBurgersData] = useState<IngredientDetailsType[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<{
    bun: IngredientDetailsType | null;
    otherIngredients: IngredientDetailsType[];
  }>({
    bun: null,
    otherIngredients: [],
  });
  useEffect(() => {
    getBurgersData().then((data) => setBurgersData(data));
  }, []);
  const totalSumInitialState = { value: 0 };
  useEffect(() => {}, [selectedIngredients]);

  const [totalSum, totalSumDispatcher] = useReducer(
    reducer,
    totalSumInitialState
  );

  return (
    <TotalSumContext.Provider value={{ totalSum, totalSumDispatcher }}>
      <IngredientsContext.Provider value={{ burgersData, setBurgersData }}>
        <BurgerConstructorContext.Provider
          value={{ selectedIngredients, setSelectedIngredients }}
        >
          <div className={appStyle.app}>
            <header className={appStyle.header}>
              <Header />
            </header>
            <main className={appStyle.main}>
              <BurgerIngredients />
              <OrderList />
            </main>
          </div>
        </BurgerConstructorContext.Provider>
      </IngredientsContext.Provider>
    </TotalSumContext.Provider>
  );
};

export default App;
