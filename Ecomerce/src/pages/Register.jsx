// src/pages/Register.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerThunk } from "../Auth/redux/slices/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        documentType: "CC",
        documentNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const payload = {
            name: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            passwordConfirm: form.confirmPassword,
            phone: "3134904285", // puedes adaptarlo a un input si lo deseas
            document: form.documentNumber,
            name2: "",          // segundo nombre opcional
            documentTypeId: form.documentType === "CC" ? 1 : 2,
        };
        dispatch(registerThunk(payload))
            .unwrap()
            .then(() => {
                navigate("/Ecomerce/Login");
            })
            .catch(() => {
                alert("Registro fallido");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white max-w-3xl w-11/12 lg:w-2/3 p-8 shadow-md rounded-lg">
                {/* Botón cerrar (solo estética) */}
                <button
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-700"
                    onClick={() => window.history.back()}
                >
                    ×
                </button>

                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Crea tu cuenta
                </h2>

                {/* Sección “Personal” primero */}
                <p className="text-center font-medium mt-6 text-gray-700">Personal</p>
                {/* Enlace “¿Ya tienes una cuenta?” justo después */}
                <p className="text-center text-sm mb-4 text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/Ecomerce/Login" className="text-blue-600 hover:underline">
                        Inicia sesión aquí
                    </a>
                </p>

                <hr className="my-4 border-gray-200" />

                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Tipo y número de documento */}
                    <div className="flex space-x-2">
                        <select
                            name="documentType"
                            value={form.documentType}
                            onChange={onChange}
                            className="border rounded-md p-2 w-1/3"
                        >
                            <option value="CC">CC</option>
                            <option value="TI">TI</option>
                            <option value="CE">CE</option>
                        </select>
                        <Input
                            label="Número de documento *"
                            name="documentNumber"
                            value={form.documentNumber}
                            onChange={onChange}
                            placeholder="Número de documento"
                        />
                    </div>

                    <Input
                        label="Nombres *"
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        placeholder="Nombres"
                    />

                    <Input
                        label="Apellidos *"
                        name="lastName"
                        value={form.lastName}
                        onChange={onChange}
                        placeholder="Apellidos"
                    />

                    <Input
                        label="Correo electrónico *"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="Correo electrónico"
                    />

                    <p className="text-xs text-gray-500">
                        Elige una contraseña con un mínimo de 6 caracteres y al menos una
                        letra mayúscula, minúscula, número o carácter especial.
                    </p>

                    {/* Contraseña con ícono “ojo” */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-700">
                            Contraseña *
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                placeholder="Contraseña"
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

                    {/* Confirmar contraseña con ícono */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-700">
                            Confirmar contraseña *
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirm ? "text" : "password"}
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={onChange}
                                placeholder="Confirmar contraseña"
                                className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {showConfirm ? (
                                <EyeSlashIcon
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 cursor-pointer"
                                    onClick={() => setShowConfirm(false)}
                                />
                            ) : (
                                <EyeIcon
                                    className="absolute right-3 top-2.5 h-5 w-5 text-gray-500 cursor-pointer"
                                    onClick={() => setShowConfirm(true)}
                                />
                            )}
                        </div>
                    </div>

                    {/* reCAPTCHA (placeholder) */}
                    <div className="mt-4">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" disabled />
                            <span className="text-gray-500">No soy un robot</span>
                        </label>
                    </div>

                    {/* Aceptar Términos y Condiciones */}
                    <label className="flex items-center space-x-2 text-sm mt-2">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={form.agreeTerms}
                            onChange={onChange}
                        />
                        <span>
                            He leído y acepto los{" "}
                            <a href="/terms" className="text-blue-600 hover:underline">
                                Términos y Condiciones
                            </a>{" "}
                            y la{" "}
                            <a href="/privacy" className="text-blue-600 hover:underline">
                                Política de Privacidad
                            </a>
                            .
                        </span>
                    </label>

                    <Button
                        type="submit"
                        className={`w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white ${loading ? "opacity-50" : ""
                            }`}
                        disabled={!form.agreeTerms || loading}
                    >
                        {loading ? "Registrando..." : "CREAR CUENTA"}
                    </Button>

                    {error && (
                        <p className="text-red-600 text-center text-sm mt-2">
                            {typeof error === "string"
                                ? error
                                : "Error en el proceso de registro"}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
