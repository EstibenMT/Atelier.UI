import axios from "axios"
import {addData} from "../data/CartSlice"
import {API_CONFIG} from "../config/api.config"

 // Ahora recibe sessionId y userId (userId puede ser 0 si es an nimo)
export const fetchCartData = (sessionId, userId = 0) => async (dispatch) => {
    try {
          // Si userId > 0, lo pasamos como query; si es 0, omitimos en la URL
          const fetchlink =
                userId && userId > 0
                  ? `${API_CONFIG.BASE_URL}/shoppingCart/${sessionId}?userId=${userId}`
                  : `${API_CONFIG.BASE_URL}/shoppingCart/${sessionId}`
          
          const response = await axios.get(fetchlink);
          const data = response.data;
          
          dispatch(addData({ data: { ...data, userId } }));
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
          }
    };

export const postAddProduct =
  (productId, quantity = 1, productVariantId, sessionId, userId=null) =>
  async (dispatch) => {
    const payload = {
      userId: userId > 0 ? userId : null,
      sessionId: sessionId,
      productId: parseInt(productId),
      quantity: quantity,
      productVariantId: productVariantId,
    }

    try {
      const fetchlink = `${API_CONFIG.BASE_URL}/shoppingCart/addProduct`
      const response = await axios.post(fetchlink, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = response.data

      dispatch(addData({ data: { ...data, userId } }));
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error)
    }
  }

export const putdeleteProduct =
    (productId, quantity, productVariantId, sessionId, userId = null) => async (dispatch) => {
    const payload = {
      userId: userId,
      sessionId: sessionId,
      productId: parseInt(productId),
      quantity: parseInt(quantity),
      productVariantId: parseInt(productVariantId),
    }

    try {
      const fetchlink = `${API_CONFIG.BASE_URL}/shoppingCart/removeProduct`
      console.log("Enviando solicitud DELETE con payload:", payload)

      const response = await axios({
        method: "put",
        url: fetchlink,
        data: payload,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      const data = response.data
      //console.log("Respuesta del servidor:", data)
      dispatch(addData({ data: { ...data, userId } }));
    } catch (error) {
      console.error(
        "Error al eliminar el producto:",
          error.response ? error.response.data : error.message
        )
    }
  }

export const getCheckout = async(sessionId, userId = 0) => {
    try {
        const fetchlink = `${API_CONFIG.BASE_URL}/shoppingCart/checkout?sessionId=${sessionId}&userId=${userId}`;
        const response = await axios.get(fetchlink)
        const data = response.data

        return data

    } catch (error) {
        console.error("Error al realizar el checkout:", error)
        throw error;
    }
}