import { createSlice } from "@reduxjs/toolkit";
import { getSessionId } from "../data/Seccion";

const initialState = {
    sessionId: getSessionId(),
    shoppingCartProducts: [], 
    quantityProducts : 0,
    total: 0,
    iva: 0,
    subtotal: 0,
    address: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addData: (state, action) => {
            const { data } = action.payload;
            state.shoppingCartProducts = data.shoppingCartProducts;
            state.total = data.total;
            state.iva = data.tax;
            state.subtotal = data.subtotal;
            state.quantityProducts = data.quantityProducts;
        },
        addProduct: (state, action) => {
            const { product } = action.payload;
            state.shoppingCartProducts.push({ ...product, quantity: 1 });
        },
        increment: (state, action) => {
            const index = action.payload;
            state.shoppingCartProducts[index].quantity += 1;
        },
        decrement: (state, action) => {
            const index = action.payload;
            if (state.shoppingCartProducts[index].quantity > 1) {
                state.shoppingCartProducts[index].quantity -= 1;
            }
        },
        saveAddress: (state, action) => {
            state.address = action.payload;
        },
        clearCart: (state) => {
            state.shoppingCartProducts = [];
            state.address = null;
        }
    }
});

export const { addData, addProduct, increment, decrement, saveAddress, clearCart } = cartSlice.actions;
export default cartSlice.reducer;