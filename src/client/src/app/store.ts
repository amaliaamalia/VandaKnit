import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import adminCatalogReducer from '../features/admin/AdminCatalogSlice';
import authReducer from '../features/auth/AuthSlice';
import catalogReducer from '../features/catalog/CatalogSlice';
import productDetailReducer from '../features/catalog/ProductDetailSlice';
import basketReducer from '../features/basket/BasketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catalog: catalogReducer,
    adminCatalog: adminCatalogReducer,
    productDetail: productDetailReducer,
    basket: basketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();