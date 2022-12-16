import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitOrder } from "../../api/burgers";
import { RootState } from "../store";

interface InitialStateOrder {
  totalSum: number;
  orderId?: string;
}

const initialState: InitialStateOrder = {
  totalSum: 0,
};

export const postOrder = createAsyncThunk(
  "postOrder",
  async (ingredientIdsToSubmit: string[]) => {
    try {
      const orderId = await submitOrder(ingredientIdsToSubmit);
      return { orderId };
    } catch (e) {
      console.error(e);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateTotalSum: (state, action: { payload: number }) => {
      state.totalSum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.orderId = action.payload?.orderId;
    });
  },
});

export const selectOrderState = (rootState: RootState) => rootState.order;

export const { updateTotalSum } = orderSlice.actions;

export default orderSlice.reducer;
