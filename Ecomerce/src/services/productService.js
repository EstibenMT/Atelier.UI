import axios from "axios"
import {API_CONFIG} from "../config/api.config"

axios.defaults.timeout = 5000
axios.defaults.headers.common["Content-Type"] = "application/json"

export const productService = {
  //llamado para los productos destacados
  getAllProducts: async () => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}`
      )
      return response.data
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        console.error(
          "Error de conexión: No se pudo conectar al servidor. Verifica que el servidor esté corriendo."
        )
      } else if (error.code === "ECONNABORTED") {
        console.error(
          "Error de timeout: La solicitud tardó demasiado en responder."
        )
      } else {
        console.error("Error al obtener productos:", error.message)
      }
      throw error
    }
  },

  //llamado para todos los productos con filtros

  getProductById: async (productId) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}/product/${productId}`
      )
      return response.data
    } catch (error) {
      console.error(`Error al obtener el producto ${productId}:`, error.message)
      throw error
    }
  },

  getProductsByCategory: async (categoryId) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}/category/${categoryId}`
      )
      return response.data
    } catch (error) {
      console.error(
        `Error al obtener productos de la categoría ${categoryId}:`,
        error.message
      )
      throw error
    }
  },

  getProductsByBrand: async (brandId) => {
    try {
      const response = await axios.get(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}/brand/${brandId}`
      )
      return response.data
    } catch (error) {
      console.error(
        `Error al obtener productos de la marca ${brandId}:`,
        error.message
      )
      throw error
    }
  },

  getFilteredProducts: async (filters) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.BASE_URL}/product/filter`,
        filters
      )
      return response.data
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        console.error(
          "Error de conexión: No se pudo conectar al servidor. Verifica que el servidor esté corriendo."
        )
      } else if (error.code === "ECONNABORTED") {
        console.error(
          "Error de timeout: La solicitud tardó demasiado en responder."
        )
      } else {
        console.error("Error al filtrar productos:", error.message)
      }
      throw error
    }
  },
}
