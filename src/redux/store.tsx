import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "./slices/ingredients";
import orderReducer from "./slices/order";
import authReducer from "./slices/auth";
import userReducer from "./slices/user";
import ordersFeedReducer from "./slices/orders-feed";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";
import { socketMiddlwareCreator } from "../middlewares/socket-middleware";
const preloadedState = {};

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  auth: authReducer,
  user: userReducer,
  ordersFeed: ordersFeedReducer,
});
export const store = configureStore({
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(socketMiddlwareCreator());
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
