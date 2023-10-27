import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const accountState = {
  user: localStorage.getItem("ADMIN")
    ? JSON.parse(localStorage.getItem("ADMIN"))
    : {},
  isLogin: localStorage.getItem("ADMIN") ? true : false,
  isAdmin: true,
};

const accountSlice = createSlice({
  name: "account",
  initialState: accountState,
  reducers: {
    ON_LOGIN(state, action) {
      if (action.payload.isAdmin) {
        state.isLogin = true;
        localStorage.setItem("ADMIN", JSON.stringify(action.payload));
      } else {
        state.isAdmin = false;
      }
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
      localStorage.removeItem("ADMIN");
    },
  },
});

export const accountActions = accountSlice.actions;

export default accountSlice.reducer;
