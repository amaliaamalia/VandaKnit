import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';
import { RootState } from '../../app/store';
import { Order, CreateOrderRequest, SubmitOrderRequest } from '../../types/Order';
import { ApiError } from '../../types/ApiError';

interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

const initialState: OrderState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  sortField: 'status',
  sortOrder: 'asc',
};

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { currentPage, pageSize, sortField, sortOrder } = state.orders;
    try {
      const response = await api.get('/Orders', {
        params: {
          page: currentPage,
          pageSize,
          sortField,
          sortOrder,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch orders');
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string, thunkAPI) => {
    try {
      const response = await api.get(`/Orders/${orderId}`);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch order');
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (createOrderRequest: CreateOrderRequest, thunkAPI) => {
    try {
      const response = await api.post('/Orders', createOrderRequest);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to create order');
    }
  }
);

export const submitOrder = createAsyncThunk(
  'orders/submitOrder',
  async (submitOrderRequest: SubmitOrderRequest, thunkAPI) => {
    try {
      const response = await api.post('/Orders/submit', submitOrderRequest);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to submit order');
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSortField: (state, action: PayloadAction<string>) => {
      state.sortField = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setSortField, setSortOrder } = orderSlice.actions;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrder = (state: RootState) => state.orders.order;
export const selectOrderLoading = (state: RootState) => state.orders.loading;
export const selectOrderError = (state: RootState) => state.orders.error;
export default orderSlice.reducer;