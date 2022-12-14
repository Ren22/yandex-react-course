import { checkResponse } from "./checkResponse";
import { GenericObject } from "./types";

export function request(url: string, options?: GenericObject) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse)
}
