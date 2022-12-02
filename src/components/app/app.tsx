import React from "react";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Header from "../../components/header/header";
import appStyle from "./app.module.css";
import OrderList from "../burger-constructor/burger-constructor";

function App() {
  return (
    <div className={appStyle.app}>
      <header className={appStyle.header}>
        <Header />
      </header>
      <main className={appStyle.main}>
        <BurgerIngredients />
        <OrderList />
      </main>
    </div>
  );
}

export default App;
