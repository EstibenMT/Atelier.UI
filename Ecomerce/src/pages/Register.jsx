// src/pages/Register.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerThunk, loginThunk } from "../Auth/redux/slices/authSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error: apiError } = useSelector((state) => state.auth);

    // Estado del formulario
    const [form, setForm] = useState({
        documentType: "CC",
        documentNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeTerms: false,
        noRobot: true, // “No soy un robot” marcado por defecto
    });

    // Mostrar/ocultar contraseñas
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Errores de validación
    const [validationErrors, setValidationErrors] = useState([]);
    // Campos inválidos para bordes rojos
    const [invalidFields, setInvalidFields] = useState({});

    // Regex para validar email
    const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    // Verifica campos de texto/contraseña (no incluye checkboxes)
    const areRequiredFieldsFilled = () => {
        const {
            documentNumber,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = form;
        return (
            documentNumber.trim() !== "" &&
            firstName.trim() !== "" &&
            lastName.trim() !== "" &&
            email.trim() !== "" &&
            isEmailValid(email) &&
            password !== "" &&
            confirmPassword !== "" &&
            password === confirmPassword
        );
    };

    // Verifica formulario completo (incluye checkboxes)
    const isFormValid = () => {
        return areRequiredFieldsFilled() && form.agreeTerms && form.noRobot;
    };

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;

        // Actualiza valor
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        // Si campo estaba inválido, lo quitamos
        if (invalidFields[name]) {
            setInvalidFields((prev) => {
                const copy = { ...prev };
                delete copy[name];
                return copy;
            });
        }

        // Filtrar mensajes de validación solo para este campo
        if (validationErrors.length > 0) {
            setValidationErrors((prev) =>
                prev.filter(
                    (msg) =>
                        // Mensajes formateados como "campo: texto..."
                        !msg.toLowerCase().includes(name.toLowerCase())
                )
            );
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        // Validación completa
        const errors = [];
        const invalids = {};

        if (form.documentNumber.trim() === "") {
            errors.push("documentNumber: El número de documento es obligatorio.");
            invalids.documentNumber = true;
        }
        if (form.firstName.trim() === "") {
            errors.push("firstName: El campo Nombres es obligatorio.");
            invalids.firstName = true;
        }
        if (form.lastName.trim() === "") {
            errors.push("lastName: El campo Apellidos es obligatorio.");
            invalids.lastName = true;
        }
        if (form.email.trim() === "") {
            errors.push("email: El campo Correo electrónico es obligatorio.");
            invalids.email = true;
        } else if (!isEmailValid(form.email)) {
            errors.push("email: El correo electrónico no tiene un formato válido.");
            invalids.email = true;
        }
        if (form.password === "") {
            errors.push("password: El campo Contraseña es obligatorio.");
            invalids.password = true;
        }
        if (form.confirmPassword === "") {
            errors.push("confirmPassword: El campo Confirmar contraseña es obligatorio.");
            invalids.confirmPassword = true;
        }
        if (
            form.password !== "" &&
            form.confirmPassword !== "" &&
            form.password !== form.confirmPassword
        ) {
            errors.push("password: Las contraseñas no coinciden.");
            errors.push("confirmPassword: Las contraseñas no coinciden.");
            invalids.password = true;
            invalids.confirmPassword = true;
        }
        if (!form.agreeTerms) {
            errors.push("agreeTerms: Debes aceptar los Términos y Condiciones.");
            invalids.agreeTerms = true;
        }
        if (!form.noRobot) {
            errors.push("noRobot: Debes confirmar que no eres un robot.");
            invalids.noRobot = true;
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
            setInvalidFields(invalids);
            return;
        }

        // Si no hay errores de validación, limpiamos
        setValidationErrors([]);
        setInvalidFields({});

        // Payload con PascalCase para coincidir con RegisterRequestDto
        const payload = {
            Name: form.firstName,
            LastName: form.lastName,
            Email: form.email,
            Password: form.password,
            PasswordConfirm: form.confirmPassword,
            Phone: "3134904285", // fijo, o reemplazar por input adicional
            Document: form.documentNumber,
            Name2: "",
            DocumentTypeId: form.documentType === "CC" ? 1 : 2,
        };

        dispatch(registerThunk(payload))
            .unwrap()
            .then(() => {
                // Registro OK → login automático
                dispatch(loginThunk({ email: form.email, password: form.password }))
                    .unwrap()
                    .then(() => {
                        // Cambié la ruta aquí: ahora vamos a "/" en lugar de "/Ecomerce"
                        navigate("/");
                    })
                    .catch(() => {
                        alert("Login automático fallido");
                    });
            })
            .catch(() => {
                alert("Registro fallido");
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white max-w-3xl w-11/12 lg:w-2/3 p-8 shadow-md rounded-lg relative">
                <Link to="/">
                    <button className="absolute top-6 right-6 text-gray-400 hover:text-gray-700">
                        ×
                    </button>
                </Link>
                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Crea tu cuenta
                </h2>
                <p className="text-center font-medium mt-6 text-gray-700">Personal</p>
                <p className="text-center text-sm mb-4 text-gray-600">
                    ¿Ya tienes una cuenta?{" "}
                    <a href="/Ecomerce/Login" className="text-blue-600 hover:underline">
                        Inicia sesión aquí
                    </a>
                </p>
                <hr className="my-4 border-gray-200" />

                <form onSubmit={onSubmit} className="space-y-4">
                    {/* Tipo de documento + número */}
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
                        <div
                            className={
                                invalidFields.documentNumber
                                    ? "border border-red-500 rounded-md w-full"
                                    : "w-full"
                            }
                        >
                            <Input
                                label="Número de documento *"
                                name="documentNumber"
                                value={form.documentNumber}
                                onChange={onChange}
                                placeholder="Número de documento"
                                type="text"
                            />
                        </div>
                    </div>

                    {/* Campo Nombres */}
                    <div
                        className={
                            invalidFields.firstName ? "border border-red-500 rounded-md" : ""
                        }
                    >
                        <Input
                            label="Nombres *"
                            name="firstName"
                            value={form.firstName}
                            onChange={onChange}
                            placeholder="Nombres"
                            type="text"
                        />
                    </div>

                    {/* Campo Apellidos */}
                    <div
                        className={
                            invalidFields.lastName ? "border border-red-500 rounded-md" : ""
                        }
                    >
                        <Input
                            label="Apellidos *"
                            name="lastName"
                            value={form.lastName}
                            onChange={onChange}
                            placeholder="Apellidos"
                            type="text"
                        />
                    </div>

                    {/* Campo Correo electrónico */}
                    <div
                        className={invalidFields.email ? "border border-red-500 rounded-md" : ""}
                    >
                        <Input
                            label="Correo electrónico *"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder="Correo electrónico"
                        />
                    </div>

                    <p className="text-xs text-gray-500">
                        Elige una contraseña con un mínimo de 6 caracteres y al menos una letra
                        mayúscula, minúscula, número o carácter especial.
                    </p>

                    {/* Campo Contraseña */}
                    <div
                        className={
                            invalidFields.password ? "border border-red-500 rounded-md" : ""
                        }
                    >
                        <label className="block text-sm mb-1 text-gray-700">Contraseña *</label>
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

                    {/* Campo Confirmar Contraseña */}
                    <div
                        className={
                            invalidFields.confirmPassword
                                ? "border border-red-500 rounded-md"
                                : ""
                        }
                    >
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

                    {/* “No soy un robot” */}
                    <div
                        className={
                            invalidFields.noRobot
                                ? "border border-red-500 rounded-md p-2"
                                : "p-2"
                        }
                    >
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="noRobot"
                                checked={form.noRobot}
                                onChange={onChange}
                                disabled
                            />
                            <span className="text-gray-500">No soy un robot</span>
                        </label>
                    </div>

                    {/* “Acepto Términos” */}
                    <div
                        className={
                            invalidFields.agreeTerms
                                ? "border border-red-500 rounded-md p-2"
                                : "p-2"
                        }
                    >
                        <label className="flex items-center space-x-2 text-sm">
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
                    </div>

                    {/* Botón Crear Cuenta */}
                    <Button
                        type="submit"
                        className={`w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white ${loading ? "opacity-50" : ""
                            }`}
                        disabled={!isFormValid() || loading}
                    >
                        {loading ? "Registrando..." : "CREAR CUENTA"}
                    </Button>

                    {/* Mensajes de validación y errores de la API */}
                    <div className="mt-4">
                        {validationErrors.length > 0 && (
                            <ul className="text-red-600 text-sm list-disc list-inside">
                                {validationErrors.map((msg, idx) => (
                                    <li key={idx}>
                                        {msg.split(": ").slice(1).join(": ")}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!validationErrors.length && apiError && (
                            <p className="text-red-600 text-center text-sm">
                                {typeof apiError === "string"
                                    ? apiError
                                    : apiError.message ||
                                    "Error en el proceso de registro"}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
