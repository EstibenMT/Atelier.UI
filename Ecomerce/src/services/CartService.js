import axios from "axios"
import {addData, clearCart} from "../data/CartSlice"
import {API_CONFIG} from "../config/api.config"

export const fetchCartData = (sessionId) => async (dispatch) => {
  try {
    const fetchlink = `${API_CONFIG.BASE_URL}/shoppingCart/${sessionId}`
    const response = await axios.get(fetchlink)
    const data = response.data

    // Si no hay productos en el carrito, limpiamos el estado
    if (!data.shoppingCartProducts || data.shoppingCartProducts.length === 0) {
      dispatch(clearCart())
    } else {
      dispatch(addData({data}))
    }
  } catch (error) {
    console.error("Error al obtener el carrito:", error)
    // Si hay un error, limpiamos el carrito
    dispatch(clearCart())
  }
}

export const clearShoppingCart = (sessionId) => async (dispatch) => {
  try {
    const fetchlink = `${API_CONFIG.BASE_URL}/shoppingCart/clear/${sessionId}`
    await axios.delete(fetchlink)
    dispatch(clearCart())
  } catch (error) {
    console.error("Error al limpiar el carrito:", error)
  }
}

export const postAddProduct =
  (productId, quantity = 1, productVariantId, sessionId) =>
  async (dispatch) => {
    const payload = {
      userId: 0,
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

// Eliminar producto del carrito
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

      if (
        !data.shoppingCartProducts ||
        data.shoppingCartProducts.length === 0
      ) {
        dispatch(clearCart())
      } else {
        dispatch(addData({data}))
      }
    } catch (error) {
      console.error(
        "Error al eliminar el producto:",
        error.response ? error.response.data : error.message
      )
    }
  }
