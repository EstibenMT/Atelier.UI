import axios from "axios"
import {addData} from "../data/CartSlice"
import {API_CONFIG} from "../config/api.config"

export const fetchCartData = (sessionId) => async (dispatch) => {
  try {
    const fetchlink = `${API_CONFIG.BASE_URL}/shoppingCart/${sessionId}`
    const response = await axios.get(fetchlink)
    const data = response.data

    dispatch(addData({data}))
    
  } catch (error) {
    console.error("Error al obtener el carrito:", error)
  }
}

export const postAddProduct =
  (productId, quantity = 1, productVariantId, sessionId) =>
  async (dispatch) => {
    const payload = {
      userId: null,
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

      dispatch(addData({data}))
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error)
    }
  }

export const putdeleteProduct =
  (productId, quantity, productVariantId, sessionId) => async (dispatch) => {
    const payload = {
      userId: 0,
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
        console.log("Respuesta del servidor:", data)
        dispatch(addData({ data }))
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