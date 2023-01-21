import { BASE_URL } from ".";
import { SubmitOrderDataResp } from "../types/ingredients";
import { getCookie } from "../utils/cookieHandler";
import { request } from "../utils/request";
import { IngredientDetailsType } from "../utils/types";

export function getIngredientsData(): Promise<IngredientDetailsType[]> {
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
      Authorization: "Bearer" + getCookie("accessToken"),
    },
  }).then((data: SubmitOrderDataResp) => {
    return data.order.number;
  });
}
