// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:5209'; // Ajusta si tu API corre en otro puerto

// Thunk para login: POST a http://localhost:5209/api/auth/login
export const loginThunk = createAsyncThunk(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/login`, {
                email,
                password,
            });
            // response.data tiene { userId, name, lastName, email, token }
            return response.data;
        } catch (err) {
            // Si el servidor devuelve 401 o 400, err.response.data contendrá el mensaje
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Thunk para register: POST a http://localhost:5209/api/user/register
export const registerThunk = createAsyncThunk(
    'auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            // formData debe coincidir con RegisterRequestDto:
            // { name, email, password, passwordConfirm, phone, document, lastName, name2, documentTypeId }
            const response = await axios.post(`${BASE_URL}/api/user/register`, formData);
            return response.data; // "Usuario registrado correctamente."
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const initialState = {
    user: null,                         // Aquí guardaremos { userId, name, lastName, email, token }
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            // --- LOGIN ---
            .addCase(loginThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;            // action.payload = { userId, name, lastName, email, token }
                state.token = action.payload.token;      // guardamos el token
                localStorage.setItem('token', action.payload.token);
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // --- REGISTER ---
            .addCase(registerThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
