import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import api from '../../api/api';
import { RootState } from '../../app/store';
import { ApiError } from '../../types/ApiError';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';

interface AdminCatalogState {
  categories: Category[];
  products: Product[];
  loading: boolean;
  error: string | null;
  currentProductPage: number;
  currentCategoryPage: number;
  pageSize: number;
  totalProducts: number;
  totalCategories: number;
}

const initialState: AdminCatalogState = {
  categories: [],
  products: [],
  loading: false,
  error: null,
  currentProductPage: 1,
  currentCategoryPage: 1,
  pageSize: 10,
  totalProducts: 0,
  totalCategories: 0,
};

export const fetchCategories = createAsyncThunk(
  'adminCatalog/fetchCategories',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { currentCategoryPage, pageSize } = state.adminCatalog;
    try {
      const response = await api.get('/Categories', {
        params: {
          page: currentCategoryPage,
          pageSize,
        },
      });
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch categories');
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'adminCatalog/fetchProducts',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    const { currentProductPage, pageSize } = state.adminCatalog;
    try {
      const response = await api.get('/Products', {
        params: {
          page: currentProductPage,
          pageSize,
        },
      });
      return {
        products: response.data,
      };
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to fetch products');
    }
  }
);

export const createCategory = createAsyncThunk(
  'adminCatalog/createCategory',
  async (category: Category, thunkAPI) => {
    try {
      const response = await api.post('/Categories', category);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'adminCatalog/updateCategory',
  async ({ id, category }: { id: string; category: Category }, thunkAPI) => {
    try {
      const response = await api.put(`/Categories/${id}`, category);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'adminCatalog/deleteCategory',
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/Categories/${id}`);
      return id;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to delete category');
    }
  }
);

export const createProduct = createAsyncThunk(
  'adminCatalog/createProduct',
  async (product: Product, thunkAPI) => {
    try {
      const response = await api.post('/Products', product);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'adminCatalog/updateProduct',
  async ({ id, product }: { id: string; product: Product }, thunkAPI) => {
    try {
      const response = await api.put(`/Products/${id}`, product);
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'adminCatalog/deleteProduct',
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/Products/${id}`);
      return id;
    } catch (error) {
      const apiError = error as ApiError;
      return thunkAPI.rejectWithValue(apiError.response?.data || 'Failed to delete product');
    }
  }
);

const adminCatalogSlice = createSlice({
  name: 'adminCatalog',
  initialState,
  reducers: {
    setProductPage: (state, action: PayloadAction<number>) => {
      state.currentProductPage = action.payload;
    },
    setCategoryPage: (state, action: PayloadAction<number>) => {
      state.currentCategoryPage = action.payload;
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
        state.products = action.payload.products;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex((category) => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.id !== action.payload);
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export const { setProductPage, setCategoryPage } = adminCatalogSlice.actions;
export default adminCatalogSlice.reducer;