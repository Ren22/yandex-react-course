import React, { useEffect, useState } from "react";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Header from "../../components/header/header";
import appStyle from "./app.module.css";
import OrderList from "../burger-constructor/burger-constructor";
import { IngredientDetailsType } from "../burger-ingredients-item/burger-ingredients-item";
import { getBurgersData } from "../../api/burgers";

const App = () => {
  const [burgersData, setBurgersData] = useState<IngredientDetailsType[]>([]);
  useEffect(() => {
    getBurgersData().then((data) => setBurgersData(data));
  }, []);
  return (
    <div className={appStyle.app}>
      <header className={appStyle.header}>
        <Header />
      </header>
      <main className={appStyle.main}>
        <BurgerIngredients burgersData={burgersData} />
        <OrderList burgersData={burgersData} />
      </main>
    </div>
  );
};

export default App;
