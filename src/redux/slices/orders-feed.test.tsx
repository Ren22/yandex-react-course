import { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import { RootState, AppDispatch } from "../store";
import { initialIngredientsState } from "./ingredients.test";
import configureMockStore from "redux-mock-store";
import {
  ordersFeedSlice,
  selectOrders,
  selectSelectedOrderInFeed,
  selectTotalOrders,
  selectTotalOrdersToday,
  WebsocketStatus,
} from "./orders-feed";

const initialOrdersFeed = { status: null, connectionError: "" };

const mockStoreInitialState = {
  ingredients: { ...initialIngredientsState },
  auth: { userForgotPswrdEmailSent: false, userIsPasswordReset: false },
  user: { userIsLoading: false, user: null },
  ordersFeed: { status: null, connectionError: "" },
  order: { orderIsLoading: false },
};

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares);

describe("orders-feed reducer", () => {
  let store: MockStoreEnhanced;
  beforeEach(() => {
    store = mockStore(mockStoreInitialState);
  });

  it("should wsInit", async () => {
    const newState = ordersFeedSlice.reducer(initialOrdersFeed, {
      type: "ordersFeed/wsInit",
    });
    expect(newState.status).toBe(WebsocketStatus.CONNECTING);
  });

  it("should wsOpen", async () => {
    const newState = ordersFeedSlice.reducer(initialOrdersFeed, {
      type: "ordersFeed/wsOpen",
    });
    expect(newState.status).toBe(WebsocketStatus.ONLINE);
    expect(newState.connectionError).toBe(undefined);
  });

  it("should wsClose", async () => {
    const newState = ordersFeedSlice.reducer(initialOrdersFeed, {
      type: "ordersFeed/wsClose",
    });
    expect(newState.status).toBe(WebsocketStatus.OFFLINE);
  });

  it("should wsError", async () => {
    const newState = ordersFeedSlice.reducer(initialOrdersFeed, {
      type: "ordersFeed/wsError",
      payload: "error",
    });
    expect(newState.connectionError).toBe("error");
  });

  it("should wsGetMessage", async () => {
    const mockData = {
      createdAt: "2010",
      ingredients: [],
      name: "name",
      number: 2,
      status: "status",
      updatedAt: "2020",
      _id: "1",
    };
    const action = {
      type: "ordersFeed/wsGetMessage",
      payload: {
        orders: [mockData],
        total: 100,
        totalToday: 50,
      },
    };
    const newState = ordersFeedSlice.reducer(initialOrdersFeed, action);

    expect(newState.orders).toEqual([mockData]);
    expect(newState.totalOrders).toBe(100);
    expect(newState.totalToday).toBe(50);
  });

  it("should setSelectedOrderInFeed", async () => {
    const mockData = {
      createdAt: "2010",
      ingredients: [],
      name: "name",
      number: 2,
      status: "status",
      updatedAt: "2020",
      _id: "1",
    };
    const action = {
      type: "ordersFeed/setSelectedOrderInFeed",
      payload: mockData,
    };
    const newState = ordersFeedSlice.reducer(initialOrdersFeed, action);
    expect(newState.selectedOrderInFeed).toBe(mockData);
  });

  it("should selectTotalOrders", () => {
    store = mockStore({
      ...mockStoreInitialState,
      ordersFeed: { totalOrders: 10, status: "", connectionError: undefined },
    });
    const totalOrders = selectTotalOrders(store.getState() as RootState);
    expect(totalOrders).toEqual(10);
  });

  it("should selectTotalOrdersToday", () => {
    store = mockStore({
      ...mockStoreInitialState,
      ordersFeed: { totalToday: 10, status: "", connectionError: undefined },
    });
    const totalToday = selectTotalOrdersToday(store.getState() as RootState);
    expect(totalToday).toEqual(10);
  });

  it("should selectOrders", () => {
    const mockData = {
      createdAt: "2010",
      ingredients: [],
      name: "name",
      number: 2,
      status: "status",
      updatedAt: "2020",
      _id: "1",
    };
    store = mockStore({
      ...mockStoreInitialState,
      ordersFeed: {
        orders: [mockData],
        status: "",
        connectionError: undefined,
      },
    });
    const orders = selectOrders(store.getState() as RootState);
    expect(orders).toEqual([mockData]);
  });

  it("should selectSelectedOrderInFeed", () => {
    store = mockStore({
      ...mockStoreInitialState,
      ordersFeed: {
        selectedOrderInFeed: undefined,
        status: "",
        connectionError: undefined,
      },
    });
    const selectedOrderInFeed = selectSelectedOrderInFeed(
      store.getState() as RootState
    );
    expect(selectedOrderInFeed).toEqual(undefined);
  });
});
