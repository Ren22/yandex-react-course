import { IngredientDetailsType } from "../utils/types";

const INGREDIENTS_URL = "https://norma.nomoreparties.space/api/ingredients";
const ORDERS_API = "https://norma.nomoreparties.space/api/orders";

export function getBurgersData(): Promise<IngredientDetailsType[]> {
  return fetch(INGREDIENTS_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return data.data;
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
}

export function submitOrder(ingredientIds: string[]) {
  return fetch(ORDERS_API, {
    method: "POST",
    body: JSON.stringify({
      ingredients: ingredientIds,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      return data.order.number;
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
}
