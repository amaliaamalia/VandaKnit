import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import adminCatalogReducer from '../features/admin/AdminCatalogSlice';
import authReducer from '../features/auth/AuthSlice';
import catalogReducer from '../features/catalog/CatalogSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    catalog: catalogReducer,
    adminCatalog: adminCatalogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>() 