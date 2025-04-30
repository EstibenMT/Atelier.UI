import axios from "axios"

const API_URL = "http://localhost:5209/api"

export const postSale = async (shoppingCartId,sessionId,email,document,total,address) => {
  try {
   // Armar el body esperado por el backend
      const payload = {
          shoppingCartId: shoppingCartId,
          sessionId: sessionId,
          email: email,
          document: document,
          totalAmount: total,
          address: address 
    };

    const response = await axios.post(`${API_URL}/sale`, payload)
    return response.data
  } catch (error) {
    console.error("Error al crear la venta:", error)
    throw error
  }
}
