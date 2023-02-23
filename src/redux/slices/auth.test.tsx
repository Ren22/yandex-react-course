import { configureStore, Store } from "@reduxjs/toolkit";
import authReducer, { authSlice, registerUserReducer } from "./auth";
import { setCookie, deleteCookie } from "../../utils/cookieHandler";

const initialState = {
  userIsLoggedIn: false,
  userIsRegistered: false,
  userForgotPswrdEmailSent: false,
  userIsPasswordReset: false,
};

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

jest.mock("../../utils/cookieHandler", () => {
  const setCookie = jest.fn();
  const deleteCookie = jest.fn();
  return {
    setCookie,
    deleteCookie,
  };
});

// Mock the window.alert function
window.alert = jest.fn();

describe("auth reducer", () => {
  let store: Store;
  beforeEach(() => {
    store = configureStore({ reducer: { auth: authReducer } });
  });

  it("should return the inital state", () => {
    expect(authReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle setIsEmailSentToDefault", () => {
    const action = { type: "auth/setIsEmailSentToDefault" };
    const newState = authSlice.reducer(
      { ...initialState, userForgotPswrdEmailSent: true },
      action
    );

    expect(newState).toEqual(initialState);
  });

  it("should handle setIsResetPasswordReqSentToDefault", () => {
    const action = { type: "auth/setIsResetPasswordReqSentToDefault" };
    const newState = authSlice.reducer(
      { ...initialState, userIsPasswordReset: true },
      action
    );

    expect(newState).toEqual(initialState);
  });

  it("registerUser pending", () => {
    store.dispatch(
      registerUserReducer.pending("", {
        email: "test@gmail.com ",
        password: "superstrongpassword",
        name: "name",
      })
    );
    const { userIsLoading, userIsRegistered } = store.getState().auth;
    expect(userIsLoading).toBe(true);
    expect(userIsRegistered).toBe(false);
  });

  it("registerUser fulfilled", () => {
    const mockedPayload = {
      success: true,
      user: {
        email: "test@gmail.com ",
        name: "name",
      },
      accessToken: "token",
      refreshToken: "refreshToken",
    };
    store.dispatch(
      registerUserReducer.fulfilled(mockedPayload, "", {
        email: "test@gmail.com ",
        password: "superstrongpassword",
        name: "name",
      })
    );
    const { userIsLoading, userIsRegistered } = store.getState().auth;
    expect(userIsLoading).toBe(false);
    expect(userIsRegistered).toBe(true);
    expect(localStorage.getItem("refreshToken")).toBe("refreshToken");
    expect(deleteCookie).toHaveBeenCalledWith("accessToken");
    expect(deleteCookie).toBeCalledTimes(1);
    expect(setCookie).toHaveBeenCalledWith(
      "accessToken",
      mockedPayload.accessToken
    );
    expect(setCookie).toBeCalledTimes(1);
  });

  it("registerUser rejected", () => {
    const errorMessage = "User registration failed, please contact support";
    store.dispatch(
      registerUserReducer.rejected(
        null,
        "",
        {
          email: "test@gmail.com ",
          password: "superstrongpassword",
          name: "name",
        },
        { message: errorMessage }
      )
    );
    const { userIsLoading, userIsRegistered, error } = store.getState().auth;
    expect(userIsLoading).toBe(false);
    expect(userIsRegistered).toBe(false);
    expect(error).toBe("User registration failed, please contact support");
    expect(alert).toBeCalledWith(errorMessage);
  });
});
