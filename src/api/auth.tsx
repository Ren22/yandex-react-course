import { BASE_URL } from ".";
import { request } from "../utils/request";
export interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}
interface RegistrationResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

interface LoginResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordInput {
  password: string;
  token: string;
}

interface RefreshTokenResponse {
  success: boolean;
  accessToken: string;
  refreshToken: string;
}

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
    return data;
  });
}

export function resetPassword({ password, token }: ResetPasswordInput) {
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

export function registerUser({ email, password, name }: RegisterUserInput) {
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
  }).then((data: RegistrationResponse) => {
    return data;
  });
}

export async function loginUser({ email, password }: LoginUserInput) {
  return request(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data: LoginResponse) => {
    return data;
  });
}

export async function logoutUser(token: string | null) {
  return request(`${BASE_URL}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data: LogoutResponse) => {
    return data;
  });
}

export async function refreshAccessToken(refreshToken: string | null) {
  return request(`${BASE_URL}/auth/token`, {
    method: "POST",
    body: JSON.stringify({
      refreshToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((data: RefreshTokenResponse) => {
    return data;
  });
}
