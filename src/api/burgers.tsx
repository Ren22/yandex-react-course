import { request } from "../utils/request";
import { IngredientDetailsType } from "../utils/types";

const BASE_URL = "https://norma.nomoreparties.space/api";

export function getBurgersData(): Promise<IngredientDetailsType[]> {
  return request(`${BASE_URL}/ingredients`).then((data) => {
    return data.data;
  });
}

export function submitOrder(ingredientIds: string[]) {
  return request(`${BASE_URL}/orders`, {
    method: "POST",
    body: JSON.stringify({
      ingredients: ingredientIds,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    return data.order.number;
  });
}
