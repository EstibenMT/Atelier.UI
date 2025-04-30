import axios from "axios";

const url = "http://localhost:5209";

export const getCountry= () => async () => {
    try {
        const fetchlink = url + "/api/country";
        const response = await axios.get(fetchlink);
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};

export const getState = (countryId) => async () => {
    try {
        const fetchlink = url + "/api/state?countryId=" + countryId;
        const response = await axios.get(fetchlink);
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};

export const getCity = (stateId) => async () => {
    try {
        const fetchlink = url + "/api/city?countryId=" + stateId;
        const response = await axios.get(fetchlink);
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};

export const getStreetType = () => async () => {
    try {
        const fetchlink = url + "/api/streetType";
        const response = await axios.get(fetchlink);
        const data = response.data;

        return data;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
    }
};

