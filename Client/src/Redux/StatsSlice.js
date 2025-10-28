import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStats = createAsyncThunk("stats/fetchStats", async (_, thunkAPI) => {
    try{
    const token = localStorage.getItem("token");
const response = await axios.get("http://localhost:5000/weekly-stats",{
    headers: {
        Authorization: `Bearer ${token}`,
      },
});
  console.log('response', response.data.results.total)
  return response.data.results.total;
} catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch stats");

}
});

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default statsSlice.reducer;