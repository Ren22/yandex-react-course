import React, { useEffect, useState } from "react";
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

const App = () => {
  const [burgersData, setBurgersData] = useState<IngredientDetailsType[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<{
    bun: IngredientDetailsType | null;
    others: IngredientDetailsType[];
  }>({
    bun: null,
    others: [],
  });
  useEffect(() => {
    getBurgersData().then((data) => setBurgersData(data));
  }, []);
  return (
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
  );
};

export default App;
