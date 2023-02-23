import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { refreshAccessToken } from "../../api/auth";
import { getUserData, patchUserData } from "../../api/user";
import { UserDataResponse } from "../../types/user";
import { getCookie, setCookie } from "../../utils/cookieHandler";
import { RootState } from "../store";
export interface User {
  email?: string;
  name?: string;
  password?: string;
}

export interface InitialStateUser {
  user: User | null;
  userIsLoading: boolean;
  userIsLoaded?: boolean;
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

export const getUserDataReducer = createAsyncThunk(
  "getUserData",
  async (_, { rejectWithValue }) => {
    const commonPart = async () => {
      const accesToken = getCookie("accessToken");
      const res = (await getUserData(accesToken)) as UserDataResponse;
      return { ...res };
    };
    try {
      return await commonPart();
    } catch (e: unknown) {
      if (isJwtExpiredError(e) && e.message.includes("expired")) {
        const { accessToken } = await refreshAccessToken(
          localStorage.getItem("refreshToken")
        );
        setCookie("accessToken", accessToken);
        return await commonPart();
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const setUserDataReducer = createAsyncThunk(
  "setUserData",
  async (userInput: User, { rejectWithValue }) => {
    const accesToken = getCookie("accessToken");

    const commonPart = async () => {
      const res = (await patchUserData(
        userInput,
        accesToken
      )) as UserDataResponse;
      return { ...res };
    };
    try {
      return await commonPart();
    } catch (e: unknown) {
      if (isJwtExpiredError(e) && e.message.includes("expired")) {
        const { accessToken } = await refreshAccessToken(
          localStorage.getItem("refreshToken")
        );
        setCookie("accessToken", accessToken);
        return await commonPart();
      } else {
        return rejectWithValue(e);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToNull: (state) => {
      state.user = null;
      state.userIsLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDataReducer.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userIsLoading = false;
        state.userIsLoaded = true;
      })
      .addCase(getUserDataReducer.pending, (state) => {
        state.userIsLoading = true;
        state.userIsLoaded = false;
      })
      .addCase(getUserDataReducer.rejected, (state) => {
        state.userIsLoading = false;
        state.userIsLoaded = false;
      })
      // set user data
      .addCase(setUserDataReducer.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.userIsLoaded = true;
        state.userIsLoading = false;
        alert("User data is successfully updated");
      })
      .addCase(setUserDataReducer.pending, (state) => {
        state.userIsLoaded = false;
        state.userIsLoading = true;
      })
      .addCase(setUserDataReducer.rejected, (state, action) => {
        state.userIsLoaded = false;
        state.userIsLoading = false;
        alert(action.error.message);
      });
  },
});

export default userSlice.reducer;

export const selectUser = (rootState: RootState) => rootState.user.user;

export const selectUserIsLoaded = (rootState: RootState) =>
  rootState.user.userIsLoaded;

export const { setUserToNull } = userSlice.actions;
