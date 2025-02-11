import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';
import { RootState } from '../../app/store';
import { Product } from '../../types/Product';
import { Category } from '../../types/Category';
import { ApiError } from '../../types/ApiError';

interface CatalogState {
  categories: Category[];
  category: Category | null;
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
  sortField: string;
  sortOrder: 'asc' | 'desc';
}

const initialState: CatalogState = {
  categories: [],
  category: null,
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
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch categories');
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  'catalog/fetchCategoryById',
  async (categoryId: string, thunkAPI) => {
    try {
      const response = await api.get(`/Categories/${categoryId}`);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch category');
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
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch products');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'catalog/fetchProductsByCategory',
  async ({ categoryId, page, pageSize, orderBy, sortOrder }: { categoryId: string; page: number; pageSize: number; orderBy: string; sortOrder: string }, thunkAPI) => {
    try {
      const response = await api.get(`/Products/category/${categoryId}`, {
        params: {
          page,
          pageSize,
          orderBy,
          sortOrder,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch products by category');
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
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
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
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setPage, setSortField, setSortOrder } = catalogSlice.actions;
export default catalogSlice.reducer;