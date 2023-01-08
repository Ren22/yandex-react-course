import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  forgotPassword,
  loginUser,
  LoginUserInput,
  logoutUser,
  registerUser,
  RegisterUserInput,
  resetPassword,
  ResetPasswordInput,
} from "../../api/auth";
import { deleteCookie, setCookie } from "../../utils/cookieHandler";
import { RootState } from "../store";

interface InitialStateAuth {
  userIsLoading?: boolean;
  userIsLoggedIn?: boolean;
  userIsRegistered?: boolean;
  userForgotPswrdEmailSent: boolean;
  forgotPswrdIsLoading?: boolean;
  userIsPasswordReset: boolean;
  resetPswrdIsLoading?: boolean;
  error?: string;
  userPassword?: string;
  userLogoutIsLoading?: boolean;
}

const initialState: InitialStateAuth = {
  userIsLoggedIn: false,
  userIsRegistered: false,
  userForgotPswrdEmailSent: false,
  userIsPasswordReset: false,
  userPassword: "",
};

export const registerUserReducer = createAsyncThunk(
  "registerUser",
  async (userInput: RegisterUserInput) => {
    const res = await registerUser(userInput);
    setCookie("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return { ...res };
  }
);

export const loginUserReducer = createAsyncThunk(
  "loginUser",
  async (userInput: LoginUserInput) => {
    const res = await loginUser(userInput);
    setCookie("accessToken", res.accessToken);
    localStorage.setItem("refreshToken", res.refreshToken);
    return { ...res, password: userInput.password };
  }
);

export const forgotPasswordReducer = createAsyncThunk(
  "forgotPass",
  async (email: string) => {
    await forgotPassword(email);
  }
);

export const resetPasswordReducer = createAsyncThunk(
  "resetPass",
  async (resetPswrdInput: ResetPasswordInput) => {
    await resetPassword(resetPswrdInput);
  }
);

export const logoutUserReducer = createAsyncThunk("logout", async () => {
  const token = localStorage.getItem("refreshToken");
  await logoutUser(token);
  deleteCookie("accessToken");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // user register
      .addCase(registerUserReducer.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userIsRegistered = true;
      })
      .addCase(registerUserReducer.pending, (state) => {
        state.userIsLoading = true;
        state.userIsRegistered = false;
      })
      .addCase(registerUserReducer.rejected, (state, action) => {
        alert(action.error.message);
        state.userIsLoading = false;
        state.userIsRegistered = false;
        state.error = "User registration failed, please contact support.";
      })
      // user login
      .addCase(loginUserReducer.fulfilled, (state, action) => {
        state.userIsLoading = false;
        state.userIsLoggedIn = true;
      })
      .addCase(loginUserReducer.pending, (state) => {
        state.userIsLoading = true;
        state.userIsLoggedIn = false;
      })
      .addCase(loginUserReducer.rejected, (state, action) => {
        alert(action.error.message);
        state.userIsLoading = false;
        state.userIsLoggedIn = false;
        state.error = "User login failed, please contact support.";
      })
      // forgot pswrd
      .addCase(forgotPasswordReducer.fulfilled, (state) => {
        state.forgotPswrdIsLoading = false;
        state.userForgotPswrdEmailSent = true;
      })
      .addCase(forgotPasswordReducer.pending, (state) => {
        state.forgotPswrdIsLoading = true;
        state.userForgotPswrdEmailSent = false;
        state.userIsLoggedIn = false;
      })
      .addCase(forgotPasswordReducer.rejected, (state, action) => {
        alert(action.error.message);
        state.userForgotPswrdEmailSent = false;
        state.forgotPswrdIsLoading = false;
        state.error =
          "User forgot password check failed, please contact support.";
      })
      // reset pswrd
      .addCase(resetPasswordReducer.fulfilled, (state, action) => {
        state.resetPswrdIsLoading = false;
        state.userIsPasswordReset = true;
        alert(
          "Password is successfully reset, you will be redirected to the login page"
        );
      })
      .addCase(resetPasswordReducer.pending, (state) => {
        state.resetPswrdIsLoading = true;
        state.userIsPasswordReset = false;
      })
      .addCase(resetPasswordReducer.rejected, (state, action) => {
        alert(action.error.message);
        state.resetPswrdIsLoading = false;
        state.userIsPasswordReset = false;
        state.error = "User password reset has failed, please contact support.";
      })
      // logout user
      .addCase(logoutUserReducer.fulfilled, (state) => {
        state.userLogoutIsLoading = false;
        alert("Logout is done. Redirecting to the main page");
      })
      .addCase(logoutUserReducer.pending, (state) => {
        state.userLogoutIsLoading = true;
      })
      .addCase(logoutUserReducer.rejected, (state, action) => {
        alert(action.error.message);
        state.userLogoutIsLoading = false;
        state.error = "User logout has failed, please contact support.";
      });
  },
});

export const selectIsUserLoggedIn = (rootState: RootState) =>
  rootState.auth.userIsLoggedIn;
export const selectIsUserRegistered = (rootState: RootState) =>
  rootState.auth.userIsLoggedIn;
export const selectIsForgotPswrdEmailSent = (rootState: RootState) =>
  rootState.auth.userForgotPswrdEmailSent;
export const selectIsResetPasswordReqSent = (rootState: RootState) =>
  rootState.auth.userIsPasswordReset;
export default authSlice.reducer;
