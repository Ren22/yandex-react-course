import { BASE_URL } from ".";
import {
  ResetPasswordInput,
  RegisterUserInput,
  RegistrationResponse,
  LoginUserInput,
  LoginResponse,
  LogoutResponse,
  RefreshTokenResponse,
} from "../types/auth";
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
  });
}

export function resetPassword({ password, token }: ResetPasswordInput) {
  return request(`${BASE_URL}/password-reset/reset`, {
    method: "POST",
    body: JSON.stringify({
      password,
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function registerUser({
  email,
  password,
  name,
}: RegisterUserInput): Promise<RegistrationResponse> {
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
  });
}

export async function loginUser({
  email,
  password,
}: LoginUserInput): Promise<LoginResponse> {
  return request(`${BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function logoutUser(
  token: string | null
): Promise<LogoutResponse> {
  return request(`${BASE_URL}/auth/logout`, {
    method: "POST",
    body: JSON.stringify({
      token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function refreshAccessToken(
  refreshToken: string | null
): Promise<RefreshTokenResponse> {
  return request(`${BASE_URL}/auth/token`, {
    method: "POST",
    body: JSON.stringify({
      token: refreshToken,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
