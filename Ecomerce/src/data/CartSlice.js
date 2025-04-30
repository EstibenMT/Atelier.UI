import { createSlice } from "@reduxjs/toolkit";
import { getSessionId } from "../data/Seccion";

const initialState = {
    sessionId: getSessionId(),
    shoppingCartId:0,
    shoppingCartProducts: [], 
    quantityProducts : 0,
    total: 0,
    iva: 0,
    subtotal: 0,
    address: null,
    email: "",
    document:"",
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addData: (state, action) => {
            const { data } = action.payload;
            state.shoppingCartId = data.shoppingCartId;
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
        saveAddress: (state, action) => {
            const { address, email, document } = action.payload;
            state.address = address;
            state.email = email;
            state.document = document;
        },
        clearCart: () => {
            return { ...initialState, sessionId: getSessionId() };
        }
    }
});

export const { addData, addProduct, saveAddress, clearCart } = cartSlice.actions;
export default cartSlice.reducer;