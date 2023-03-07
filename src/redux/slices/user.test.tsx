import { AppDispatch, RootState } from "../store";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { initialIngredientsState } from "./ingredients.test";
import { initialOrderState } from "./order.test";
import userReducer, {
  getUserDataReducer,
  InitialStateUser,
  selectUser,
  selectUserIsLoaded,
  setUserDataReducer,
  userSlice,
} from "../slices/user";
import fetchMock from "fetch-mock";
import { BASE_URL } from "../../api";
import { getCookie } from "../../utils/cookieHandler";

const initialUserState: InitialStateUser = {
  user: null,
  userIsLoading: false,
};

const mockStoreInitialState = {
  ingredients: initialIngredientsState,
  auth: { userForgotPswrdEmailSent: false, userIsPasswordReset: false },
  user: initialUserState,
  ordersFeed: { status: null, connectionError: "" },
  order: initialOrderState,
};

const mockResp = {
  success: true,
  user: { email: "grandmix.ru@gmail.com", name: "testU2dfd" },
};

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares);

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
  const getCookie = jest.fn().mockReturnValue("token");
  return {
    getCookie,
    setCookie,
    deleteCookie,
  };
});

describe("user reducer", () => {
  let store: MockStoreEnhanced<RootState>;
  let alertMock: any;

  beforeEach(() => {
    store = mockStore(mockStoreInitialState);
    alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});
  });
  afterEach(() => {
    fetchMock.restore();
  });
  it("should return the inital state", () => {
    expect(userReducer(initialUserState, { type: "" })).toEqual(
      initialUserState
    );
  });

  it("should fetch getUserData", async () => {
    fetchMock.getOnce(`${BASE_URL}/auth/user`, {
      headers: { "content-type": "application/json" },
      body: mockResp,
    });
    const expectedActions = [
      { type: "getUserData/pending", payload: undefined },
      {
        type: "getUserData/fulfilled",
        payload: mockResp,
      },
    ];
    await store.dispatch(getUserDataReducer() as any);
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should handle errors of getUserData with rejected value", async () => {
    fetchMock.get(`${BASE_URL}/auth/user`, {
      status: 403,
      body: { message: "jwt token expired", success: true },
    });
    fetchMock.postOnce(`${BASE_URL}/auth/token`, {
      accessToken: "accessToken",
    });

    await store.dispatch(getUserDataReducer() as any);
    expect(getCookie).toHaveBeenCalledWith("accessToken");
  });

  it("should rejectWithValue for getUserDataReducer", async () => {
    const errorMessage = "token is invalid";
    fetchMock.get(`${BASE_URL}/auth/user`, {
      status: 403,
      body: { message: errorMessage },
    });
    const result = await store.dispatch(getUserDataReducer() as any);
    expect(result.type).toBe(`${getUserDataReducer.rejected}`);
    expect(result.payload.message).toBe(errorMessage);
    expect(result.error).toBeDefined();
  });

  it("should getUserData fullfilled", () => {
    const newState = userSlice.reducer(initialUserState, {
      type: "getUserData/fulfilled",
      payload: {
        user: { email: "grandmix.ru@gmail.com", name: "testU2dfd" },
      },
    });

    expect(newState.user).toEqual({
      email: "grandmix.ru@gmail.com",
      name: "testU2dfd",
    });
    expect(newState.userIsLoaded).toBe(true);
  });

  it("should getUserData pending", async () => {
    const newState = userSlice.reducer(initialUserState, {
      type: "getUserData/pending",
    });

    expect(newState.userIsLoading).toBe(true);
    expect(newState.userIsLoaded).toBe(false);
  });
  it("should getUserData rejected", async () => {
    const newState = userSlice.reducer(initialUserState, {
      type: "getUserData/rejected",
    });

    expect(newState.userIsLoading).toBe(false);
    expect(newState.userIsLoaded).toBe(false);
  });

  it("should selectUser", () => {
    const mockUser = { email: "grandmix.ru@gmail.com", name: "testU2dfd" };
    store = mockStore({
      ...mockStoreInitialState,
      user: { user: mockUser, userIsLoading: false },
    });
    const user = selectUser(store.getState() as RootState);
    expect(user).toEqual(mockUser);
  });

  it("should fetch setUserData", async () => {
    fetchMock.patchOnce(`${BASE_URL}/auth/user`, {
      headers: { "content-type": "application/json" },
      body: mockResp,
    });
    const expectedActions = [
      { type: "setUserData/pending", payload: undefined },
      {
        type: "setUserData/fulfilled",
        payload: mockResp,
      },
    ];
    await store.dispatch(setUserDataReducer({}) as any);
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should handle errors of setUserData with rejected value", async () => {
    fetchMock.patch(`${BASE_URL}/auth/user`, {
      status: 403,
      body: { message: "jwt token expired", success: true },
    });
    fetchMock.postOnce(`${BASE_URL}/auth/token`, {
      accessToken: "accessToken",
    });

    await store.dispatch(setUserDataReducer({}) as any);
    expect(getCookie).toHaveBeenCalledWith("accessToken");
  });

  it("should rejectWithValue for setUserDataReducer", async () => {
    const errorMessage = "token is invalid";
    fetchMock.patchOnce(`${BASE_URL}/auth/user`, {
      status: 403,
      body: { message: errorMessage },
    });
    const result = await store.dispatch(setUserDataReducer({}) as any);
    expect(result.type).toBe(`${setUserDataReducer.rejected}`);
    expect(result.payload.message).toBe(errorMessage);
    expect(result.error).toBeDefined();
  });

  it("should setUserData fullfilled", () => {
    const newState = userSlice.reducer(initialUserState, {
      type: "setUserData/fulfilled",
      payload: {
        user: { email: "grandmix.ru@gmail.com", name: "testU2dfd" },
      },
    });

    expect(newState.user).toEqual({
      email: "grandmix.ru@gmail.com",
      name: "testU2dfd",
    });
    expect(newState.userIsLoaded).toBe(true);
    expect(newState.userIsLoading).toBe(false);
    expect(alertMock).toHaveBeenCalledWith("User data is successfully updated");
  });

  it("should setUserData pending", async () => {
    const newState = userSlice.reducer(initialUserState, {
      type: "setUserData/pending",
    });

    expect(newState.userIsLoading).toBe(true);
    expect(newState.userIsLoaded).toBe(false);
  });

  it("should setUserData rejected", async () => {
    const newState = userSlice.reducer(initialUserState, {
      type: "setUserData/rejected",
      error: { message: "Error" },
    });

    expect(newState.userIsLoading).toBe(false);
    expect(newState.userIsLoaded).toBe(false);
    expect(alertMock).toHaveBeenCalledWith("Error");
  });

  it("should logoutUserReducer fulfilled", async () => {
    const newState = userSlice.reducer(
      {
        ...initialUserState,
        user: {
          email: "grandmix.ru@gmail.com",
          name: "testU2dfd",
        },
      },
      {
        type: "user/setUserToNull",
      }
    );

    expect(newState.user).toBe(null);
    expect(newState.userIsLoaded).toBe(false);
  });

  it("should selectUserIsLoaded", () => {
    const mockUser = { email: "grandmix.ru@gmail.com", name: "testU2dfd" };
    store = mockStore({
      ...mockStoreInitialState,
      user: { user: mockUser, userIsLoading: false, userIsLoaded: false },
    });
    const userIsLoaded = selectUserIsLoaded(store.getState() as RootState);
    expect(userIsLoaded).toEqual(false);
  });
});
