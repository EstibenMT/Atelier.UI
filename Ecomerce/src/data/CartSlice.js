import { createSlice } from "@reduxjs/toolkit";
import { getSessionId } from "../data/Seccion";

const initialState = {
    sessionId: getSessionId(),
    saleId:0,
    shoppingCartId:0,
    shoppingCartProducts: [], 
    quantityProducts : 0,
    total: 0,
    iva: 0,
    subtotal: 0,
    address: JSON.parse(localStorage.getItem('address')) || null,
    email: localStorage.getItem('email') || "",
    document: localStorage.getItem('document') || "",
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
        addSaleId: (state, action) => {
            const {saleId } = action.payload;
            state.saleId = saleId;
        },
        saveAddress: (state, action) => {
            const { address, email, document } = action.payload;
            state.address = address;
            state.email = email;
            state.document = document;
            localStorage.setItem('address', JSON.stringify(address));
            localStorage.setItem('email', email);
            localStorage.setItem('document', document);
        },
        clearCart: () => {
            localStorage.removeItem('sessionId');
            localStorage.removeItem('address');
            localStorage.removeItem('email');
            localStorage.removeItem('document');
            return { ...initialState, sessionId: getSessionId() };
        }
    }
});

export const { addData, addProduct, saveAddress, clearCart, addSaleId } = cartSlice.actions;
export default cartSlice.reducer;