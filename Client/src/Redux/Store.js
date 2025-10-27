import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import StatsReducer from "./StatsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    stats: StatsReducer
  },
});

export default store;