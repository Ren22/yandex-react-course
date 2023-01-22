import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getIngredientsData } from "../../api/ingredients";
import { InitialStateIngredients } from "../../types/ingredients";
import { IngredientDetailsType, INGREDIENT_TYPES } from "../../utils/types";
import { RootState } from "../store";

const initialState: InitialStateIngredients = {
  allIngredients: [],
  selectedIngredients: { others: [] },
  currentIngredient: null,
  isIngredientDragged: false,
  ingredientsAreLoaded: false,
};

export const loadAllIngredients = createAsyncThunk(
  "loadAllIngredients",
  async () => {
    try {
      const allIngredients = await getIngredientsData();
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
      if (action.payload.type === INGREDIENT_TYPES.bun) {
        state.selectedIngredients.bun = action.payload;
      } else {
        state.selectedIngredients.others = [
          ...state.selectedIngredients.others,
          { ...action.payload },
        ];
      }
    },
    removeIngredient: (state, action: { payload: number }) => {
      const indexToRemove = action.payload;
      if (indexToRemove === -1) return;
      state.selectedIngredients.others = [
        ...state.selectedIngredients.others.slice(0, indexToRemove),
        ...state.selectedIngredients.others.slice(indexToRemove + 1),
      ];
    },
    closeIngredientDetails: (state) => {
      state.currentIngredient = null;
    },
    moveIngredients: (
      state,
      action: { payload: { dragIndex: number; hoverIndex: number } }
    ) => {
      const dragItem =
        state.selectedIngredients.others[action.payload.dragIndex];
      if (dragItem) {
        const copiedState = [...state.selectedIngredients.others];
        // remove item by hover index and replace it with the dragItem
        const prevItem = copiedState.splice(
          action.payload.hoverIndex,
          1,
          dragItem
        );
        copiedState.splice(action.payload.dragIndex, 1, prevItem[0]);

        state.selectedIngredients.others = [...copiedState];
      }
    },
    changeDraggingIngredientState: (state, action: { payload: boolean }) => {
      state.isIngredientDragged = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllIngredients.fulfilled, (state, action) => {
        state.ingredientsAreLoaded = false;
        state.allIngredients = action.payload
          ? action.payload.allIngredients
          : [];
      })
      .addCase(loadAllIngredients.pending, (state) => {
        state.ingredientsAreLoaded = true;
      })
      .addCase(loadAllIngredients.rejected, (state) => {
        state.ingredientsAreLoaded = false;
        state.error =
          "Error, something went wrong. Contact support if problem persis";
      });
  },
});

export const selectIngredientsState = (rootState: RootState) =>
  rootState.ingredients;

export const selectSelectedIngredients = (rootState: RootState) =>
  rootState.ingredients.selectedIngredients;

export const selectIsIngredientDragged = (rootState: RootState) =>
  rootState.ingredients.isIngredientDragged;

export const {
  pickIngredient,
  addIngredient,
  removeIngredient,
  closeIngredientDetails,
  moveIngredients,
  changeDraggingIngredientState,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
