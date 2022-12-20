export interface IngredientDetailsType {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
}

export enum INGREDIENT_TYPES {
  bun = "bun",
  sauce = "sauce",
  main = "main",
}


export type GenericObject<T = unknown> = {
  [key in string]: T
}
