// src/Auth/services/authService.js
import axios from 'axios';

// 👉 Ajusta aquí la URL base al prefijo correcto de tu API
const BASE_URL = 'http://localhost:5209/api/Auth';

export const loginUser = async (credentials) => {
    const response = await axios.post(`${BASE_URL}/login`, {
        email: credentials.email,
        password: credentials.password,
    });
    return response.data;
};

export const registerUser = async (data) => {
    // Si tu endpoint de registro está en /api/Auth/register:
    const response = await axios.post(`${BASE_URL}/register`, data);
    return response.data;
};
