export interface InitialStateIngredients {
  allIngredients: IngredientDetailsType[];
  selectedIngredients: {
    bun?: IngredientDetailsType;
    others: IngredientDetailsType[];
  };
  currentIngredient: IngredientDetailsType | null;
  isIngredientDragged: boolean;
  ingredientsAreLoaded: boolean;
  error?: string;
}

export interface SubmitOrderDataResp {
  order: {
    number: string;
  };
}