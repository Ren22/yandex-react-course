import { BASE_URL } from ".";
import { request } from "../utils/request";

export function forgotPassword(email: string) {
  return request(`${BASE_URL}/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    debugger;
    return data;
  });
}

export function resetPassword(password: string, token: string) {
  return request(`${BASE_URL}/password-reset`, {
    method: "POST",
    body: JSON.stringify({
      password,
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    return data;
  });
}

export function registerUser(email: string, password: string, name: string) {
  return request(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      name,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    return data;
  });
}

export async function loginUser(email: string, password: string) {
  return request(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data) => {
    debugger;
    return data;
  });
}
