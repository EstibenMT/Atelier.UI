import axios from "axios"

const API_URL = "http://atelier.runasp.net/api"

export const getCountries = async () => {
  try {
    const response = await axios.get(`${API_URL}/country`)
    return response.data
  } catch (error) {
    console.error("Error al obtener países:", error)
    throw error
  }
}

export const getStates = async (countryId) => {
  try {
    const response = await axios.get(`${API_URL}/state?countryId=${countryId}`)
    return response.data
  } catch (error) {
    console.error("Error al obtener estados:", error)
    throw error
  }
}

export const getCities = async (stateId) => {
  try {
    const response = await axios.get(`${API_URL}/city?stateId=${stateId}`)
    return response.data
  } catch (error) {
    console.error("Error al obtener ciudades:", error)
    throw error
  }
}

export const getStreetTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/streetType`)
    return response.data
  } catch (error) {
    console.error("Error al obtener tipos de vía:", error)
    throw error
  }
}
