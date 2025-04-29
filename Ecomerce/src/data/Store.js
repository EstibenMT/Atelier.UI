import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../data/cartSlice";

const Store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default Store