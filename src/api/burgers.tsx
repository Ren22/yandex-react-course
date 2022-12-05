import { IngredientDetailsType } from "../utils/types";

const API_URL = "https://norma.nomoreparties.space/api/ingredients";

export function getBurgersData(): Promise<IngredientDetailsType[]> {
  return fetch(API_URL)
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
