import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';
import { RootState } from '../../app/store';

interface CatalogState {
  categories: any[];
  products: any[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

const initialState: CatalogState = {
  categories: [],
  products: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  sortField: 'name',
  sortOrder: 'asc',
};

export const fetchCategories = createAsyncThunk(
  'catalog/fetchCategories',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/Categories');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch categories');
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'catalog/fetchProducts',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { currentPage, pageSize, sortField, sortOrder } = state.catalog;
    try {
      const response = await api.get('/Products', {
        params: {
          page: currentPage,
          pageSize,
          sortField,
          sortOrder,
        },
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch products');
    }
  }
);

const catalogSlice = createSlice({
  name: 'catalog',
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
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setSortField, setSortOrder } = catalogSlice.actions;
export default catalogSlice.reducer;