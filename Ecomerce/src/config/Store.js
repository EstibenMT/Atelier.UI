// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Auth/redux/slices/authSlice';
import cartReducer from '../data/CartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
});
