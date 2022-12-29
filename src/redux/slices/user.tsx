import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface User {
  email: string;
  name: string;
}

interface InitialStateUser {
  user: {
    email: string;
    name: string;
  } | null;
}

const initialState: InitialStateUser = {
  user: null,
};

// const userSlice = createSlice({});
