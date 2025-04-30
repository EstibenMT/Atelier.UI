import axios from "axios"

const API_URL = "http://localhost:5209/api"

export const createSale = async (saleData) => {
  try {
    // Validar que el shoppingCartId sea válido
    if (!saleData.shoppingCartId) {
      throw new Error("El ID del carrito de compras es requerido")
    }

    // Validar que la dirección tenga los campos requeridos
    if (!saleData.address) {
      throw new Error("La dirección es requerida")
    }

    // Validar campos obligatorios de la dirección
    const requiredAddressFields = [
      "streetTypeId",
      "description",
      "number",
      "cityId",
      "stateId",
      "countryId",
    ]

    const missingFields = requiredAddressFields.filter(
      (field) => !saleData.address[field]
    )

    if (missingFields.length > 0) {
      throw new Error(
        `Campos de dirección faltantes: ${missingFields.join(", ")}`
      )
    }

    const response = await axios.post(`${API_URL}/sale`, saleData)
    return response.data
  } catch (error) {
    console.error("Error al crear la venta:", error)
    throw error
  }
}
