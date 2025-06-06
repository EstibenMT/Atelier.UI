import axios from "axios"
import { API_CONFIG } from "../config/api.config";
import { logoutThunk } from '../Auth/redux/slices/authSlice';

export const postSale = (shoppingCartId, sessionId, email, document, total, address, navigate) =>
  async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;

    try {
      const payload = {
        shoppingCartId,
        sessionId,
        email,
        document,
        totalAmount: total,
        address
      };

      const response = await axios.post(`${API_CONFIG.BASE_URL}/sale`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (error) {
      if (error.response?.status === 401) {        
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        alert("Tu sesión ha expirado. Por favor vuelve a iniciar sesión.");
        await dispatch(logoutThunk());
        navigate("/Ecomerce/login");
      } else {
        console.error("Error al crear la venta:", error);
        throw error;
      }
    }
  };

export const getSale = (saleId, sessionId, navigate) =>
  async (dispatch, getState) => {
    const state = getState();
    const token = state.auth.token;

    try {
      const response = await axios.get(`${API_CONFIG.BASE_URL}/sale/${saleId}/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {        
        localStorage.setItem("redirectAfterLogin", window.location.pathname);
        alert("Tu sesión ha expirado. Por favor vuelve a iniciar sesión.");
        await dispatch(logoutThunk());
        navigate("/Ecomerce/login");
      } else {
        console.error("Error al obtener la información de pago:", error);
        throw error;
      }
    }
  };