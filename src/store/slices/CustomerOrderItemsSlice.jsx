import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

const API_URL = "/sap/items";

export const fetchOrderItems = createAsyncThunk(
  "orderItems/fetchOrderItems",
  async (_, thunkApi) => {
    try {
      const response = await api.get(`${API_URL}`, { withCredentials: true ,timeout: 30000});
      console.log("fetchorderitemresponse",response.data)
      return response.data;
      
    } catch (error) {
      console.log("API Error", error);
      console.log("Status", error.response?.status);
      console.log("Data", error.response?.data);

      return thunkApi.rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      });
    }
  }
);

export const createOrderItems = createAsyncThunk(
  "orderItems/createOrderItems",
  async (data, thunkApi) => {
    try {
      const response = await api.post(API_URL, data, { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || "Error creating orderItems" 
      );
    }
  }
);

export const updateOrderItems = createAsyncThunk(
  "orderItems/updateOrderItems",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${id}`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteOrderItems = createAsyncThunk(
  "orderItems/deleteOrderItems",
  async (id, thunkAPI) => {
    try {
      const response = await api.delete(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
export const fetchOrderItemsFormsById = createAsyncThunk(
  "orderItems/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await api.get(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching orderItems"
      );
    }
  }
);

const orderItemsSlice = createSlice({
  name: "orderItems",
  initialState: {
    orderItemses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderItems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.orderItemses = action.payload;
      })
      .addCase(fetchOrderItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message;
      })
      .addCase(createOrderItems.fulfilled, (state, action) => {
        state.orderItemses.push(action.payload);
      })
      .addCase(updateOrderItems.fulfilled, (state, action) => {
        const index = state.orderItemses.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.orderItemses[index] = action.payload;
        }
      })
      .addCase(deleteOrderItems.fulfilled, (state, action) => {
        state.orderItemses = state.orderItemses.filter((c) => c.id !== action.payload);
      });
  },
});

export default orderItemsSlice.reducer;
