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
      console.log(response);
      return response
  } catch (error) {
    console.error("Error al crear la venta:", error)
    throw error
  }
}

export const getSale = async (saleId, sessionId) => {
    try {
        const fetchlink = `${API_URL}/sale/${saleId}/${sessionId}`
        const response = await axios.get(fetchlink)
        const data = response.data
        
        return data

    } catch (error) {
        console.error("Error al obtener el informacion de pago:", error)
        throw error;
    }
}