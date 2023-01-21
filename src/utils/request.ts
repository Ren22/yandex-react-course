import { checkResponse } from "./responseHandlers";

export function request(url: RequestInfo, options: RequestInit = {}) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse)
}
