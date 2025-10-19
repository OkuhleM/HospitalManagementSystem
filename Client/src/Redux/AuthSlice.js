import { createSlice } from "@reduxjs/toolkit";
import { decodeToken, getToken, isTokenExpired } from "../Utils/auth";

const initialState = {
  user: null,
};

const token = getToken();
if (token && !isTokenExpired(token)) {
  initialState.user = decodeToken(token);
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;