import axios from "axios";
import { addData } from "./cartSlice";

const url = "http://localhost:5209";


export const fetchCartData = () => async (dispatch) => {
    try {
        const fetchlink = url + "/api/shoppingCart/3e2w5yjbkk12zce4mkb3qghz";
        const response = await axios.get(fetchlink); 
        const data = response.data;

        dispatch(addData({ data }));
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};

