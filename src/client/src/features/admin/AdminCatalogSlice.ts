import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

interface AdminCatalogState {
  categories: any[];
  products: any[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminCatalogState = {
  categories: [],
  products: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk(
  'adminCatalog/fetchCategories',
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
  'adminCatalog/fetchProducts',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/Products');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch products');
    }
  }
);

export const createCategory = createAsyncThunk(
  'adminCatalog/createCategory',
  async (category: any, thunkAPI) => {
    try {
      const response = await api.post('/Categories', category);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create category');
    }
  }
);

export const updateCategory = createAsyncThunk(
  'adminCatalog/updateCategory',
  async ({ id, category }: { id: string; category: any }, thunkAPI) => {
    try {
      const response = await api.put(`/Categories/${id}`, category);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update category');
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'adminCatalog/deleteCategory',
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/Categories/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete category');
    }
  }
);

export const createProduct = createAsyncThunk(
  'adminCatalog/createProduct',
  async (product: any, thunkAPI) => {
    try {
      const response = await api.post('/Products', product);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'adminCatalog/updateProduct',
  async ({ id, product }: { id: string; product: any }, thunkAPI) => {
    try {
      const response = await api.put(`/Products/${id}`, product);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'adminCatalog/deleteProduct',
  async (id: string, thunkAPI) => {
    try {
      await api.delete(`/Products/${id}`);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to delete product');
    }
  }
);

const adminCatalogSlice = createSlice({
  name: 'adminCatalog',
  initialState,
  reducers: {},
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

export default adminCatalogSlice.reducer;