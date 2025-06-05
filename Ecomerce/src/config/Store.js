// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Auth/redux/slices/authSlice';
import cartReducer from '../data/CartSlice'; // Ya lo tenías

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
});
