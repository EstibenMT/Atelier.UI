import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="max-w-md w-full px-8">
                <button
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-700"
                    onClick={() => window.history.back()}
                >
                    X
                </button>
                <h2 className="text-2xl font-semibold text-center text-gray-900">Nos alegra verte de nuevo</h2>
                <p className="text-center text-sm mt-2 text-gray-600">
                    ¿No tienes una cuenta?{' '}
                    <a href="/Ecomerce/Register" className="text-blue-600 hover:underline">Créala aquí</a>
                </p>
                <form className="mt-6 space-y-5">
                    <Input label="Correo electrónico" type="email" placeholder="Escribe tu correo electrónico" />
                    <Input
                        label="Contraseña"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Ahora tu contraseña"
                        icon
                        onIconClick={() => setShowPassword(!showPassword)}
                    />
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="form-checkbox" />
                            <span>Recordar mi sesión</span>
                        </label>
                        <a href="/recover" className="text-blue-600 hover:underline">¿Problemas al ingresar?</a>
                    </div>
                    <Button type="submit" className="w-full">Iniciar sesión</Button>
                    <p className="text-xs text-center text-gray-500 mt-6">
                        Para más sobre el uso de tus datos, consulta nuestra{' '}
                        <a href="/privacy" className="text-blue-600 hover:underline">Política de Privacidad</a>.
                    </p>
                </form>
            </div>
        </div>
    );
}
