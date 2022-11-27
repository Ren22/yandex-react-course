import React from "react";
import BurgerIngredients from "./components/burger-ingredients/burger-ingredients";
import Header from "./components/header/header";
import appStyle from "./app.module.css";

function App() {
  return (
    <div>
      <Header />
      <main className={appStyle.main}>
        <BurgerIngredients />
        <div>
          <h2>2 column</h2>
        </div>
      </main>
    </div>
  );
}

export default App;
