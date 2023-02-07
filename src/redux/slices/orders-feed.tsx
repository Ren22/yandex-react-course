import { createSlice } from "@reduxjs/toolkit";
import { IngredientDetailsType } from "../../utils/types";
import { RootState } from "../store";

enum WebsocketStatus {
  CONNECTING = "CONNECTING",
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

type SelectedOrderInFeed = {
  ingredients: IngredientDetailsType[];
  number: number;
  createdAt: string;
  status: string;
  name: string;
};

type InitialStateOrdersFeed = {
  status: WebsocketStatus;
  orders?: OrderDetails[];
  totalOrders?: number;
  totalToday?: number;
  connectionError: string | undefined;
  selectedOrderInFeed?: SelectedOrderInFeed;
  webSocketURL?: string;
};

const initialState: InitialStateOrdersFeed = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: undefined,
};

export type OrderDetails = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

type wsOrdersResp = {
  orders: OrderDetails[];
  total: number;
  totalToday: number;
};

const ordersFeedSlice = createSlice({
  name: "ordersFeed",
  initialState,
  reducers: {
    wsInit: (state, action: { payload: string }) => {
      state.webSocketURL = action.payload;
      state.status = WebsocketStatus.CONNECTING;
    },
    wsOpen: (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = undefined;
    },
    wsClose: (state) => {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError: (state, action) => {
      state.connectionError = action.payload;
    },
    wsGetMessage: (state, action: { payload: wsOrdersResp }) => {
      state.orders = action.payload.orders;
      state.totalOrders = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setSelectedOrderInFeed: (
      state,
      action: { payload: SelectedOrderInFeed }
    ) => {
      state.selectedOrderInFeed = action.payload;
    },
  },
});

export const selectTotalOrders = (rootState: RootState) =>
  rootState.ordersFeed.totalOrders;

export const selectTotalOrdersToday = (rootState: RootState) =>
  rootState.ordersFeed.totalToday;

export const selectOrders = (rootState: RootState) =>
  rootState.ordersFeed.orders;

export const selectSelectedOrderInFeed = (rootState: RootState) =>
  rootState.ordersFeed.selectedOrderInFeed;

export const {
  wsClose,
  wsError,
  wsGetMessage,
  wsOpen,
  wsInit,
  setSelectedOrderInFeed,
} = ordersFeedSlice.actions;
export default ordersFeedSlice.reducer;