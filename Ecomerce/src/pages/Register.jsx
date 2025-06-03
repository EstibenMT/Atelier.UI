import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Register() {
    const [form, setForm] = useState({
        documentType: 'CC',
        documentNumber: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeTerms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // aquí tu llamada a la API de registro…
        console.log('Registrar', form);
    };

    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
       <div className="bg-white max-w-3xl w-11/12 lg:w-2/3 p-8">
                <button
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-700"
                    onClick={() => window.history.back()}
                >
                    X
                </button>
                <h2 className="text-2xl font-semibold text-center text-gray-900">
                    Crea tu cuenta
                </h2>
                               {/* primero “Personal” */}
                              <p className="text-center font-medium mt-6 text-gray-700">Personal</p>
                               {/* luego el enlace de “¿Ya tienes una cuenta?” */}
                              <p className="text-center text-sm mb-4 text-gray-600">
                                       ¿Ya tienes una cuenta?{' '}
                                        <a href="/Ecomerce/login" className="text-blue-600 hover:underline">
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

                    <Input
                        label="Contraseña *"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        icon
                        onIconClick={() => setShowPassword(!showPassword)}
                        placeholder="Contraseña"
                    />

                    <Input
                        label="Confirmar contraseña *"
                        type={showConfirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={onChange}
                        icon
                        onIconClick={() => setShowConfirm(!showConfirm)}
                        placeholder="Confirmar contraseña"
                    />

                    {/* reCAPTCHA placeholder */}
                    <div className="mt-4">
                        {/* Aquí introducirás el componente real de reCAPTCHA */}
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" Enable />
                            <span className="text-gray-500">No soy un robot</span>
                        </label>
                    </div>

                    <label className="flex items-center space-x-2 text-sm mt-2">
                        <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={form.agreeTerms}
                            onChange={onChange}
                        />
                        <span>
                            He leído y acepto los{' '}
                            <a href="/terms" className="text-blue-600 hover:underline">
                                Términos y Condiciones
                            </a>{' '}
                            y la{' '}
                            <a href="/privacy" className="text-blue-600 hover:underline">
                                Política de Privacidad
                            </a>
                            .
                        </span>
                    </label>

                    <Button
                        type="submit"
                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                        disabled={!form.agreeTerms}
                    >
                        CREAR CUENTA
                    </Button>
                </form>
            </div>
        </div>
    );
}
