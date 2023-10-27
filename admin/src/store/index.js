import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./reducer/accountReducer";

const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export default store;
