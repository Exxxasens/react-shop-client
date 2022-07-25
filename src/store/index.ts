import { baseApi } from '../api/baseApi';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import addressSlice from './slices/addressSlice';

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [addressSlice.name]: addressSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: true
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
