import { configureStore, Store } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import { baseApi } from '../api/baseApi';

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        [authSlice.name]: authSlice.reducer
    }
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
