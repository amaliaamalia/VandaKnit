import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';
import { Product } from '../../types/Product';
import { RootState } from '../../app/store';
import { ApiError } from '../../types/ApiError';

interface ProductDetailState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

export const fetchProductDetail = createAsyncThunk(
  'productDetail/fetchProductDetail',
  async (productId: string, thunkAPI) => {
    try {
      const response = await api.get(`/Products/${productId}`);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch product details');
    }
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetail.pending, (state) => {
        state.product = null;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectProductDetail = (state: RootState) => state.productDetail;
export default productDetailSlice.reducer;