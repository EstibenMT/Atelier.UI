const API_URL = "http://atelier.runasp.net/api"

export const categoryService = {
  getAll: async () => {
    try {
      console.log("Iniciando petición a categorías...")
      const response = await fetch(`${API_URL}/category`)

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const data = await response.json()
      console.log("Respuesta de categorías:", data)

      if (!Array.isArray(data)) {
        console.error("La respuesta no es un array:", data)
        return []
      }

      return data
    } catch (error) {
      console.error("Error en categoryService.getAll:", error)
      return []
    }
  },
}
