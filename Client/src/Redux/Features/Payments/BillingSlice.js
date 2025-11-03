import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all billing accounts for the admin dashboard
export const fetchBillings = createAsyncThunk(
  "billings/fetchBillings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:5000/bills")
      console.log('data.data', data.data)
      return response.data.data; // adjust depending on your backend response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Error fetching billing data");
    }
  }
);

const billingSlice = createSlice({
  name: "billings",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBillings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default billingSlice.reducer;