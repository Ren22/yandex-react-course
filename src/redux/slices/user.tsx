import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../../api/auth";
import { getUserData, patchUserData } from "../../api/user";
import { setCookie } from "../../utils/cookieHandler";
import { RootState } from "../store";
import { loginUserReducer } from "./auth";
export interface User {
  email?: string;
  name?: string;
  password?: string;
}

interface InitialStateUser {
  user: User | null;
  userIsLoading: boolean;
}

const initialState: InitialStateUser = {
  user: null,
  userIsLoading: false,
};

interface YandexCustomErrorResp {
  message: string;
  success: boolean;
}

function isJwtExpiredError(smth: unknown): smth is YandexCustomErrorResp {
  return (
    typeof smth === "object" &&
    smth !== null &&
    smth.hasOwnProperty("message") &&
    smth.hasOwnProperty("success")
  );
}

// export const setUserInfo = createAction(
//   "setUserInfo",
//   function prepare(userInfo: User) {
//     debugger;
//     return {
//       payload: {
//         user: userInfo,
//       },
//     };
//   }
// );

export const getUserDataReducer = createAsyncThunk(
  "getUserData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserData();
      return { ...res };
    } catch (e: unknown) {
      if (isJwtExpiredError(e) && e.message.includes("expired")) {
        const { accessToken } = await refreshAccessToken(
          localStorage.getItem("refreshToken")
        );
        setCookie("accessToken", accessToken);
        const res = await getUserData();
        return { ...res };
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const setUserDataReducer = createAsyncThunk(
  "setUserData",
  async (userInput: User, { rejectWithValue }) => {
    try {
      const res = await patchUserData(userInput);
      return { ...res };
    } catch (e: unknown) {
      if (isJwtExpiredError(e) && e.message.includes("expired")) {
        const { accessToken } = await refreshAccessToken(
          localStorage.getItem("refreshToken")
        );
        setCookie("accessToken", accessToken);
        const res = await getUserData();
        return { ...res };
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDataReducer.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userIsLoading = false;
      })
      .addCase(getUserDataReducer.pending, (state) => {
        state.userIsLoading = true;
      })
      .addCase(getUserDataReducer.rejected, (state, action) => {
        state.userIsLoading = false;
        alert(action.error.message);
      })
      // set user data
      .addCase(setUserDataReducer.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userIsLoading = false;
        alert("User data is successfully updated");
      })
      .addCase(setUserDataReducer.pending, (state) => {
        state.userIsLoading = true;
      })
      .addCase(setUserDataReducer.rejected, (state, action) => {
        state.userIsLoading = false;
        alert(action.error.message);
      })
      .addCase(loginUserReducer.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default userSlice.reducer;

export const selectUserData = (rootState: RootState) => rootState.user.user;
