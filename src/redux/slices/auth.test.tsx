import {
  registerUserReducer,
  authSlice,
  loginUserReducer,
  selectIsUserLoggedIn,
  forgotPasswordReducer,
  resetPasswordReducer,
  logoutUserReducer,
  selectIsUserRegistered,
  selectIsForgotPswrdEmailSent,
  selectIsResetPasswordReqSent,
} from "./auth";
import fetchMock from "fetch-mock";
import { BASE_URL } from "../../api";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { RootState, AppDispatch } from "../store";
import { initialIngredientsState } from "./ingredients.test";
import { deleteCookie, setCookie } from "../../utils/cookieHandler";

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares);

export const initialStateAuth = {
  userForgotPswrdEmailSent: false,
  userIsPasswordReset: false,
};

const mockStoreInitialState = {
  ingredients: initialIngredientsState,
  auth: initialStateAuth,
  user: { userIsLoading: false, user: null },
  ordersFeed: { status: null, connectionError: "" },
  order: { orderIsLoading: false },
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

describe("auth reducer", () => {
  let store: MockStoreEnhanced;
  let alertMock: any;

  beforeEach(() => {
    store = mockStore({ ...mockStoreInitialState });
    alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it("should register user", async () => {
    const mockResp = {
      success: true,
      user: { email: "test@mail.ru", name: "test" },
      accessToken:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmI2N2ZkOTM2YjE3MDAxYmU2MTlmZCIsImlhdCI6MTY3NzQyMDU0MSwiZXhwIjoxNjc3NDIxNzQxfQ.Ntd0VFPSbBDLuhzSxojkwdQSHLZ-0sBi-hn4RAeZTQA",
      refreshToken:
        "7d81fc6a90408b9602e19848dff9617f475dd987b0abe84a9bfb9dfabe11d1f4a0839b92005083a0",
    };
    fetchMock.postOnce(`${BASE_URL}/auth/register`, {
      headers: { "content-type": "application/json" },
      body: mockResp,
    });
    const expectedActions = [
      { type: "registerUser/pending", payload: undefined },
      {
        type: "registerUser/fulfilled",
        payload: mockResp,
      },
    ];
    await store.dispatch(
      registerUserReducer({
        email: "",
        password: "",
        name: "",
      }) as any
    );
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should registerUser fullfilled", () => {
    const mockPayload = {
      success: true,
      user: { email: "test@mail.ru", name: "test" },
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
    const newState = authSlice.reducer(initialStateAuth, {
      type: "registerUser/fulfilled",
      payload: mockPayload,
    });
    expect(setCookie).toHaveBeenCalledWith(
      "accessToken",
      mockPayload.accessToken
    );
    expect(newState.userIsLoading).toBe(false);
    expect(newState.userIsRegistered).toBe(true);
    expect(localStorage.getItem("refreshToken")).toBe("refreshToken");
    expect(deleteCookie).toHaveBeenCalledWith("accessToken");
    expect(deleteCookie).toBeCalledTimes(1);
  });

  it("should registerUser pending", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "registerUser/pending",
    });
    expect(newState.userIsLoading).toBe(true);
    expect(newState.userIsRegistered).toBe(false);
  });

  it("should registerUser rejected", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "registerUser/rejected",
    });
    const mockErr = "User registration failed, please contact support";
    expect(alertMock).toHaveBeenCalledWith(mockErr);
    expect(newState.userIsLoading).toBe(false);
    expect(newState.userIsRegistered).toBe(false);
    expect(newState.error).toBe(mockErr);
  });

  it("should login user", async () => {
    const mockResp = {
      success: true,
      accessToken: "accessToken",
      refreshToken: "refreshToken",
      user: { email: "test@mail.ru", name: "testU2dfd" },
    };
    fetchMock.postOnce(`${BASE_URL}/auth/login`, {
      headers: { "content-type": "application/json" },
      body: mockResp,
    });
    const expectedActions = [
      { type: "loginUser/pending", payload: undefined },
      {
        type: "loginUser/fulfilled",
        payload: mockResp,
      },
    ];
    await store.dispatch(
      loginUserReducer({
        email: "",
        password: "",
      }) as any
    );
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should loginUser fullfilled", () => {
    const mockPayload = {
      success: true,
      user: { email: "test@mail.ru", password: "test" },
      accessToken: "accessToken",
      refreshToken: "refreshToken",
    };
    const newState = authSlice.reducer(initialStateAuth, {
      type: "loginUser/fulfilled",
      payload: mockPayload,
    });
    expect(setCookie).toHaveBeenCalledWith(
      "accessToken",
      mockPayload.accessToken
    );
    expect(newState.userIsLoading).toBe(false);
    expect(newState.userIsLoggedIn).toBe(true);
    expect(localStorage.getItem("refreshToken")).toBe("refreshToken");
    expect(deleteCookie).toHaveBeenCalledWith("accessToken");
    expect(deleteCookie).toBeCalledTimes(1);
  });

  it("should loginUser pending", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "loginUser/pending",
    });
    expect(newState.userIsLoading).toBe(true);
    expect(newState.userIsLoggedIn).toBe(false);
  });

  it("should loginUser rejected", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "loginUser/rejected",
    });
    const mockErr = "User login failed, please contact support";
    expect(alertMock).toHaveBeenCalledWith(mockErr);
    expect(newState.userIsLoading).toBe(false);
    expect(newState.userIsLoggedIn).toBe(false);
    expect(newState.error).toBe(mockErr);
  });

  it("should forgotPassword user", async () => {
    const mockResp = { success: true, message: "Reset email sent" };
    fetchMock.postOnce(`${BASE_URL}/password-reset`, {
      headers: { "content-type": "application/json" },
      body: mockResp,
    });
    const expectedActions = [
      { type: "forgotPass/pending" },
      {
        type: "forgotPass/fulfilled",
      },
    ];
    await store.dispatch(forgotPasswordReducer("grandmix.ru@gmail.com") as any);
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should forgotPassword fullfilled", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "forgotPass/fulfilled",
    });

    expect(newState.forgotPswrdIsLoading).toBe(false);
    expect(newState.userForgotPswrdEmailSent).toBe(true);
  });

  it("should forgotPassword pending", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "forgotPass/pending",
    });

    expect(newState.forgotPswrdIsLoading).toBe(true);
    expect(newState.userForgotPswrdEmailSent).toBe(false);
    expect(newState.userIsLoggedIn).toBe(false);
  });

  it("should forgotPassword rejected", () => {
    const mockErr = "User forgot password check failed, please contact support";
    const newState = authSlice.reducer(initialStateAuth, {
      type: "forgotPass/rejected",
      payload: {
        error: { message: mockErr },
      },
    });

    expect(newState.forgotPswrdIsLoading).toBe(false);
    expect(newState.userForgotPswrdEmailSent).toBe(false);

    expect(alertMock).toHaveBeenCalledWith(mockErr);
  });

  it("should reset pswrd", async () => {
    fetchMock.postOnce(`${BASE_URL}/password-reset/reset`, {
      headers: { "content-type": "application/json" },
      body: {},
    });
    const expectedActions = [
      { type: "resetPass/pending", payload: undefined },
      {
        type: "resetPass/fulfilled",
      },
    ];
    await store.dispatch(
      resetPasswordReducer({
        password: "",
        token: "",
      }) as any
    );
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should reset pswrd fullfilled", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "resetPass/fulfilled",
    });

    expect(newState.resetPswrdIsLoading).toBe(false);
    expect(newState.userIsPasswordReset).toBe(true);
    expect(alertMock).toHaveBeenCalledWith(
      "Password is successfully reset, you will be redirected to the login page"
    );
  });

  it("should reset pswrd pending", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "resetPass/pending",
    });

    expect(newState.resetPswrdIsLoading).toBe(true);
    expect(newState.userIsPasswordReset).toBe(false);
  });

  it("should reset pswrd rejected", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "resetPass/rejected",
    });

    expect(newState.resetPswrdIsLoading).toBe(false);
    expect(newState.userIsPasswordReset).toBe(false);
    expect(alertMock).toHaveBeenCalledWith(
      "User password reset has failed, please contact support."
    );
  });

  it("should logout", async () => {
    fetchMock.postOnce(`${BASE_URL}/auth/logout`, {
      headers: { "content-type": "application/json" },
      body: {},
    });
    const expectedActions = [
      { type: "logout/pending", payload: undefined },
      {
        type: "logout/fulfilled",
      },
    ];
    await store.dispatch(logoutUserReducer() as any);
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should logout user fullfilled", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "logout/fulfilled",
    });

    expect(newState.userLogoutIsLoading).toBe(false);
    expect(newState.userIsLoggedIn).toBe(false);
    expect(alertMock).toHaveBeenCalledWith(
      "Logout is done. Redirecting to the login page"
    );
    expect(deleteCookie).toHaveBeenCalledWith("accessToken");
    expect(deleteCookie).toBeCalledTimes(1);
  });

  it("should logout user pending", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "logout/pending",
    });

    expect(newState.userLogoutIsLoading).toBe(true);
  });

  it("should logout user rejected", () => {
    const newState = authSlice.reducer(initialStateAuth, {
      type: "logout/rejected",
    });

    expect(newState.userLogoutIsLoading).toBe(false);
    expect(alertMock).toHaveBeenCalledWith(
      "Logout failed. Please contact administrator"
    );
  });

  it("should setIsEmailSentToDefault", () => {
    const action = {
      type: "auth/setIsEmailSentToDefault",
    };
    const newState = authSlice.reducer(initialStateAuth, action);
    expect(newState.userForgotPswrdEmailSent).toEqual(false);
  });

  it("should setIsResetPasswordReqSentToDefault", () => {
    const action = {
      type: "auth/setIsResetPasswordReqSentToDefault",
    };
    const newState = authSlice.reducer(initialStateAuth, action);
    expect(newState.userIsPasswordReset).toEqual(false);
  });

  it("should selectIsUserLoggedIn", () => {
    store = mockStore({
      ...mockStoreInitialState,
      auth: {
        userIsLoggedIn: true,
        userForgotPswrdEmailSent: false,
        userIsPasswordReset: false,
      },
    });
    const userIsLoggedIn = selectIsUserLoggedIn(store.getState() as RootState);
    expect(userIsLoggedIn).toEqual(true);
  });

  it("should selectIsUserRegistered", () => {
    store = mockStore({
      ...mockStoreInitialState,
      auth: {
        userIsRegistered: true,
        userForgotPswrdEmailSent: false,
        userIsPasswordReset: false,
      },
    });
    const userIsRegistered = selectIsUserRegistered(
      store.getState() as RootState
    );
    expect(userIsRegistered).toEqual(true);
  });

  it("should selectIsForgotPswrdEmailSent", () => {
    store = mockStore({
      ...mockStoreInitialState,
      auth: {
        userForgotPswrdEmailSent: false,
        userIsPasswordReset: false,
      },
    });
    const userForgotPswrdEmailSent = selectIsForgotPswrdEmailSent(
      store.getState() as RootState
    );
    expect(userForgotPswrdEmailSent).toEqual(false);
  });

  it("should selectIsResetPasswordReqSent", () => {
    store = mockStore({
      ...mockStoreInitialState,
      auth: {
        userForgotPswrdEmailSent: false,
        userIsPasswordReset: false,
      },
    });
    const userIsPasswordReset = selectIsResetPasswordReqSent(
      store.getState() as RootState
    );
    expect(userIsPasswordReset).toEqual(false);
  });
});
