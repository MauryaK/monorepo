import { configureStore } from '@reduxjs/toolkit';
import { BaseApi } from './baseApi';
import authReducer from './slices/authSlice';

export const store = configureStore({
    reducer: {
        [BaseApi.reducerPath]: BaseApi.reducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(BaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;