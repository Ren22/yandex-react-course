import { BASE_URL } from ".";
import { getCookie } from "../utils/cookieHandler";
import { request } from "../utils/request";

interface UserDataResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

interface UserUpdateInput {
  email?: string;
  password?: string;
  name?: string;
}

export async function getUserData() {
  return request(`${BASE_URL}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  }).then((data: UserDataResponse) => {
    return data;
  });
}

export async function patchUserData(userUpdateInput: UserUpdateInput) {
  return request(`${BASE_URL}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer" + getCookie("accessToken"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(userUpdateInput),
  }).then((data: UserDataResponse) => {
    return data;
  });
}
