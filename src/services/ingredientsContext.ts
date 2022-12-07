import React, { Dispatch, SetStateAction } from "react";
import { IngredientDetailsType } from "../utils/types";

export const IngredientsContext =
  React.createContext
    <{ burgersData: IngredientDetailsType[], setBurgersData: (burgersData: IngredientDetailsType[]) => void }>
    ({ burgersData: [], setBurgersData: () => { } });

export const BurgerConstructorContext = 
  React.createContext
  < { selectedIngredients: { bun: IngredientDetailsType | null, others: IngredientDetailsType[]}, setSelectedIngredients: Dispatch<SetStateAction<{ bun: IngredientDetailsType | null; others: IngredientDetailsType[]; }>>}>
    ({ selectedIngredients: { bun: null, others: [] }, setSelectedIngredients: () => { } });
