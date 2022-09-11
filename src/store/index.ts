import { baseApi } from '../api/baseApi';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import addressSlice from './slices/addressSlice';
import propertiesSlice from './slices/propertiesSlice';
import contextMenuSlice from './slices/contextMenuSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [addressSlice.name]: addressSlice.reducer,
        [baseApi.reducerPath]: baseApi.reducer,
        [contextMenuSlice.name]: contextMenuSlice.reducer,
        [propertiesSlice.name]: propertiesSlice.reducer,
        [cartSlice.name]: cartSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(baseApi.middleware),
    devTools: true
});

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
