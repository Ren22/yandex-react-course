import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import Header from "../../components/header/header";

import homePageStyle from "./home.module.css";

export const HomePage = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Header />
        <main className={homePageStyle.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </>
  );
};
