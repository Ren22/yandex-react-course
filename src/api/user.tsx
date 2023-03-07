import { BASE_URL } from ".";
import { YandexCustomErrorResp } from "../types/error";
import { UserDataResponse, UserUpdateInput } from "../types/user";
import { request } from "../utils/request";

export async function getUserData(
  accessToken?: string
): Promise<UserDataResponse | YandexCustomErrorResp> {
  return request(`${BASE_URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ?? "",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
}

export async function patchUserData(
  userUpdateInput: UserUpdateInput,
  accessToken?: string
): Promise<UserDataResponse | YandexCustomErrorResp> {
  return request(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: accessToken ?? "",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(userUpdateInput),
  });
}
