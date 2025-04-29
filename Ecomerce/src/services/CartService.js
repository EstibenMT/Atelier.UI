import axios from "axios";
import { addData } from "../data/cartSlice";
import { API_CONFIG } from "../config/api.config"

export const fetchCartData = () => async (dispatch) => {
    try {
        const fetchlink = API_CONFIG.BASE_URL + "/api/shoppingCart/3e2w5yjbkk12zce4mkb3qghz";
        const response = await axios.get(fetchlink); 
        const data = response.data;

        dispatch(addData({ data }));
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};

export const postAddProduct = (productId, quantity = 1, productVariantId , sessionId) => async (dispatch) => {
    const payload = {
        userId: null, 
        sessionId: sessionId, 
        productId: productId, 
        quantity: quantity, 
        productVariantId: productVariantId 
    };

    try {
        const fetchlink = "http://localhost:5209/api/shoppingCart/addProduct";
        const response = await axios.post(fetchlink, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.data;

        dispatch(addData({ data }));
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};

// Eliminar producto del carrito
export const putdeleteProduct = (productId, quantity , productVariantId, sessionId) => async (dispatch) => {
    const payload = {
        userId: null,
        sessionId: sessionId,
        productId: productId,
        quantity: quantity,
        productVariantId: productVariantId
    };

    try {
        const fetchlink = "http://localhost:5209/api/shoppingCart/removeProduct";
        const response = await axios.put(fetchlink, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.data;

        dispatch(addData({ data }));
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }
};