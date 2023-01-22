import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { submitOrder } from "../../api/ingredients";
import { RootState } from "../store";

interface InitialStateOrder {
  orderId?: string | null;
  orderIsLoading: boolean;
  error?: string;
}

const initialState: InitialStateOrder = {
  orderId: null,
  orderIsLoading: false,
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
    setOrderToNull: (state) => {
      state.orderId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderIsLoading = false;
        state.orderId = action.payload?.orderId;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderIsLoading = true;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderIsLoading = false;
        state.error =
          "Error, something went wrong. Contact support if problem persis";
      });
  },
});

export const selectOrderState = (rootState: RootState) => rootState.order;

export const { setOrderToNull } = orderSlice.actions;

export default orderSlice.reducer;
