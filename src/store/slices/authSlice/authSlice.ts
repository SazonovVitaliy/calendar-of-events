import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "./types";
import { IUser } from "./../../../models/IUser";

const LS_IS_AUTH = "lsia";
const LS_USER = "lsu";

const initialState: IAuth = {
  isAuth: JSON.parse(localStorage.getItem(LS_IS_AUTH) ?? "false"),
  error: "Некорректный логин или пароль",
  user: JSON.parse(localStorage.getItem(LS_USER) ?? "{}"),
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state: IAuth, action: PayloadAction<IUser>) {
      state.isAuth = true;
      state.error = "";
      state.user = action.payload;
      localStorage.setItem(LS_IS_AUTH, JSON.stringify(state.isAuth));
      localStorage.setItem(LS_USER, JSON.stringify(state.user));
    },
    logout(state: IAuth, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
      state.error = "Некорректный логин или пароль";
      state.user = { username: "", password: "" };
      localStorage.setItem(LS_IS_AUTH, "false");
      localStorage.setItem(LS_USER, "{}");
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
