// src/pages/Login.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginThunk } from "../Auth/redux/slices/authSlice";
import { fetchCartData } from "../services/CartService"; // 𝗎𝗌𝖾𝗋𝖢𝖺𝗋𝗍
import { getSessionId } from "../data/Seccion";          // Para obtener el sessionId local
import Button from "../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!form.email.trim()) {
            alert("Por favor ingresa un correo electrónico.");
            return;
        }
        if (!form.password) {
            alert("Por favor ingresa una contraseña.");
            return;
        }

        dispatch(loginThunk({ email: form.email, password: form.password }))
            .unwrap()
            .then((userData) => {
                // 𝘊𝘰𝘯seguimos sessionId local (se genera en Seccion.js al entrar como anónimo)
                const sessionId = getSessionId();
                // userData trae { userId, name, lastName, email, token }
                const userId = userData.userId;

                // 𝗗𝗲𝗯𝗲𝗺𝗼𝘀 𝗳𝗲𝗰𝗵𝗮𝗿 (𝗳𝗲𝘁𝗰𝗵) 𝗲𝗹 𝗰𝗮𝗿𝗿𝗶𝘁𝗼 𝗰𝗼𝗻 𝗲𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
                dispatch(fetchCartData(sessionId, userId)).then(() => {
                    // Finalmente, redirigir a Home (o donde sea tu “dashboard”)
                    navigate("/");
                });
            })
            .catch(() => {
                // Si falla login, el slice ya puso el error en estado y se muestra abajo
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white w-full max-w-md p-8 shadow-md rounded-lg">
                <Link to="/">
                    <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-700">
                        ×
                    </button>
                </Link>
                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Iniciar sesión
                </h2>
                <form onSubmit={onSubmit} className="space-y-4 mt-6">
                    {/* --- Email --- */}
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

                    {/* --- Contraseña con ícono --- */}
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm mb-1 text-gray-700"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={onChange}
                                placeholder="Escribe tu contraseña"
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

                    <Button
                        type="submit"
                        className={`w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white ${loading ? "opacity-50" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Cargando..." : "Iniciar sesión"}
                    </Button>

                    {error && (
                        <p className="text-red-600 text-center text-sm mt-2">
                            {typeof error === "string" ? error : "Error al iniciar sesión"}
                        </p>
                    )}

                    <div className="text-center mt-4 text-sm text-gray-600">
                        ¿No tienes cuenta?{" "}
                        <Link to="/Ecomerce/Register" className="text-blue-600 hover:underline">
                            Regístrate aquí
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
