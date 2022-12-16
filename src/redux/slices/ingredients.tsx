import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBurgersData } from "../../api/burgers";
import { IngredientDetailsType } from "../../utils/types";
import { RootState } from "../store";

interface InitialStateIngredients {
  allIngredients: IngredientDetailsType[];
  selectedIngredients: {
    bun?: IngredientDetailsType;
    others: IngredientDetailsType[];
  };
  currentIngredient: IngredientDetailsType | {};
}

const initialState: InitialStateIngredients = {
  allIngredients: [],
  selectedIngredients: { others: [] },
  currentIngredient: {},
};

export const loadAllIngredients = createAsyncThunk(
  "loadAllIngredients",
  async () => {
    try {
      const allIngredients = await getBurgersData();
      return { allIngredients };
    } catch (e) {
      console.error(e);
    }
  }
);

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    pickIngredient: (state, action: { payload: IngredientDetailsType }) => {
      state.currentIngredient = action.payload;
    },
    addIngredient: (state, action: { payload: IngredientDetailsType }) => {
      if (action.payload.type === "bun") {
        state.selectedIngredients.bun = action.payload;
      } else {
        state.selectedIngredients.others.push(action.payload);
      }
    },
    removeIngredient: (state, action: { payload: IngredientDetailsType }) => {
      state.selectedIngredients.others =
        state.selectedIngredients.others?.filter(
          (it) => it._id !== action.payload._id
        );
    },
    closeIngredientDetails: (state) => {
      state.currentIngredient = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadAllIngredients.fulfilled, (state, action) => {
      state.allIngredients = action.payload
        ? action.payload.allIngredients
        : [];
    });
  },
});

export const selectIngredientsState = (rootState: RootState) =>
  rootState.ingredients;

export const {
  pickIngredient,
  addIngredient,
  removeIngredient,
  closeIngredientDetails,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
