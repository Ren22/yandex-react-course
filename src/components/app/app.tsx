import React from "react";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Header from "../../components/header/header";
import appStyle from "./app.module.css";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export interface TotalSum {
  value: number;
}

const App = () => {
  return (
    <div className={appStyle.app}>
      <section className={appStyle.headerWrapper}>
        <Header />
      </section>
      <DndProvider backend={HTML5Backend}>
        <main className={appStyle.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
};

export default App;
