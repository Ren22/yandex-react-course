import React from "react";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import Header from "./components/header/header";
import appStyle from "./app.module.css";
import OrderList from "./components/order-list/order-list";

function App() {
  return (
    <div>
      <Header />
      <main className={appStyle.main}>
        <BurgerIngredients />
        <OrderList />
      </main>
    </div>
  );
}

export default App;
