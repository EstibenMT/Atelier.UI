// src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginThunk } from "../Auth/redux/slices/authSlice";
import Button from "../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    // Manejo de estado local para email y password
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    // Actualiza form.email o form.password
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Al enviar el form, despachamos el thunk
    const onSubmit = (e) => {
        e.preventDefault();

        // Validamos en el frontend que no esté vacío
        if (!form.email.trim()) {
            alert("Por favor ingresa un correo electrónico.");
            return;
        }
        if (!form.password) {
            alert("Por favor ingresa una contraseña.");
            return;
        }

        // Despachamos el thunk con { email, password }
        dispatch(loginThunk({ email: form.email, password: form.password }))
            .unwrap()
            .then(() => {
                navigate("/"); // redirige a Home si el login fue exitoso
            })
            .catch((err) => {
                // err ya viene del payload de rejectWithValue
                alert(err ?? "Credenciales inválidas");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white max-w-md w-11/12 lg:w-2/5 p-8 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Nos alegra verte de nuevo
                </h2>
                <p className="text-center text-sm mt-2 text-gray-600">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/Ecomerce/Register" className="text-blue-600 hover:underline">
                        Créala aquí
                    </Link>
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-5">
                    {/* -------- Campo Email -------- */}
                    <div>
                        <label htmlFor="email" className="block text-sm mb-1 text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder="Escribe tu correo electrónico"
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* -------- Campo Contraseña con ícono -------- */}
                    <div>
                        <label htmlFor="password" className="block text-sm mb-1 text-gray-700">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={onChange}
                                placeholder="Ahora tu contraseña"
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {showPassword ? (
                                <EyeSlashIcon
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword(false)}
                                />
                            ) : (
                                <EyeIcon
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 cursor-pointer"
                                    onClick={() => setShowPassword(true)}
                                />
                            )}
                        </div>
                    </div>

                    {/* -------- Opciones Recordar sesión -------- */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Recordar mi sesión</span>
                        </label>
                        <Link to="/Ecomerce/Login" className="text-blue-600 hover:underline">
                            ¿Problemas al ingresar?
                        </Link>
                    </div>

                    {/* -------- Botón Iniciar Sesión -------- */}
                    <Button
                        type="submit"
                        className={`w-full ${loading ? "opacity-50" : ""}`}
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </Button>

                    {/* -------- Mensaje de Error -------- */}
                    {error && (
                        <p className="text-red-600 text-center text-sm mt-2">
                            {typeof error === "string" ? error : "Error al iniciar sesión"}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
