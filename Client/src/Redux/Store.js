import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import StatsReducer from "./StatsSlice"
import billingReducer from "./Features/Payments/BillingSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    stats: StatsReducer,
    billings: billingReducer
  },
});

export default store;