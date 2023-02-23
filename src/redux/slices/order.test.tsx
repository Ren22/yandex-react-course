import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import { BASE_URL } from "../../api";
import orderReducer, {
  orderSlice,
  postOrder,
  selectOrderState,
} from "../slices/order";
import { RootState, AppDispatch } from "../store";
import { initialIngredientsState } from "./ingredients.test";
import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";

const mockBody = {
  ingredients: [
    "60d3b41abdacab0026a733c7",
    "60d3b41abdacab0026a733ce",
    "60d3b41abdacab0026a733c7",
  ],
};

const middlewares = [thunk];
const mockStore = configureMockStore<RootState, AppDispatch>(middlewares);

export const initialOrderState = {
  orderId: null,
  orderIsLoading: false,
};

const mockStoreInitialState = {
  ingredients: { ...initialIngredientsState },
  auth: { userForgotPswrdEmailSent: false, userIsPasswordReset: false },
  user: { userIsLoading: false, user: null },
  ordersFeed: { status: null, connectionError: "" },
  order: { ...initialOrderState },
};

const mockResp = {
  success: true,
  order: {
    number: 1,
  },
};

describe("order reducer", () => {
  let store: MockStoreEnhanced<RootState>;
  beforeEach(() => {
    store = mockStore({ ...mockStoreInitialState });
  });

  it("should return the inital state", () => {
    expect(orderReducer(undefined, { type: "" })).toEqual(initialOrderState);
  });

  it("should fetch orders", async () => {
    fetchMock.postOnce(`${BASE_URL}/orders`, mockResp);
    const expectedActions = [
      { type: "postOrder/pending", payload: undefined },
      {
        type: "postOrder/fulfilled",
        payload: { orderId: mockResp.order.number },
      },
    ];
    await store.dispatch(postOrder(mockBody.ingredients) as any);
    expect(store.getActions().map(({ meta, ...rest }) => rest)).toEqual(
      expectedActions
    );
  });

  it("should postOrder pending", async () => {
    const newState = orderSlice.reducer(initialOrderState, {
      type: "postOrder/pending",
    });
    expect(newState.orderIsLoading).toBe(true);
  });

  it("should postOrder rejected", async () => {
    const newState = orderSlice.reducer(initialOrderState, {
      type: "postOrder/rejected",
    });
    expect(newState.orderIsLoading).toBe(false);
    expect(newState.error).toEqual(
      "Error, something went wrong. Contact support if problem persis"
    );
  });

  it("should postOrder fullfiled", async () => {
    const newState = orderSlice.reducer(initialOrderState, {
      type: "postOrder/fulfilled",
      payload: { orderId: "1" },
    });

    expect(newState.orderId).toBe("1");
    expect(newState.orderIsLoading).toEqual(false);
  });

  it("should setOrderToNull", async () => {
    const newState = orderSlice.reducer(
      { ...initialOrderState, orderId: "2" },
      {
        type: "order/setOrderToNull",
      }
    );

    expect(newState.orderId).toBe(null);
  });

  it("should selectOrderState", async () => {
    const mockOrder = {
      orderId: "1",
      orderIsLoading: false,
    };
    store = mockStore({
      ...mockStoreInitialState,
      order: mockOrder,
    });
    const order = selectOrderState(store.getState() as RootState);

    expect(order).toBe(mockOrder);
  });
});
