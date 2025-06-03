// src/Layout/Layout.jsx
import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    ShoppingCartIcon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    BellIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import Footer from "../components/Footer";
import logo from "../assets/LogoB.png";
import { fetchCartData } from "../services/CartService";
import { logout } from "../Auth/redux/slices/authSlice";

export default function Layout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { quantityProducts, sessionId } = useSelector((state) => state.cart);
    const { user, token } = useSelector((state) => state.auth);

    // Si hay usuario logueado (token + user), cargamos el carrito
    useEffect(() => {
        if (token && user) {
            dispatch(fetchCartData());
        }
    }, [dispatch, token, user]);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/Ecomerce/Login");
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* HEADER */}
            <header>
                {!user ? (
                    // ——— Navegación para ANÓNIMO ———
                    <div>
                        <div className="bg-black text-white flex items-center justify-end pr-16 px-6 py-3">
                            <div className="w-1/5">
                                <img src={logo} alt="Logo Ecomerce" className="w-14" />
                            </div>
                            <div className="flex items-center bg-white rounded-md overflow-hidden w-1/2">
                                <input
                                    type="text"
                                    placeholder="   ¿Qué producto estás buscando hoy?"
                                    className="w-full p-1.5 text-black outline-none font-[Roboto]"
                                />
                                <button className="bg-yellow-500 p-1.5 cursor-pointer">
                                    <MagnifyingGlassIcon className="h-6 w-6 text-black" />
                                </button>
                            </div>

                            <div className="flex space-x-3 w-1/4 justify-end">
                                <Link to="/Ecomerce/Register">
                                    <button className="bg-white p-1.5 rounded-md text-gray-700 font-semibold px-4 cursor-pointer">
                                        Crear Cuenta
                                    </button>
                                </Link>
                                <Link to="/Ecomerce/Login">
                                    <button className="bg-black p-1.5 rounded-md border border-white font-semibold px-4 cursor-pointer">
                                        Iniciar sesión
                                    </button>
                                </Link>
                                <Link to="/Ecomerce/ShoppingCart">
                                    <div className="relative">
                                        <ShoppingCartIcon className="h-6 w-6 cursor-pointer mt-2 text-white" />
                                        {quantityProducts > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {quantityProducts}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <nav className="bg-gray-500 text-white flex gap-2.5 items-center space-x-6 px-6 py-2 pl-20">
                            <button className="text-lg">☰</button>
                            <Link to="/" className="hover:underline font-[Roboto]">
                                Inicio
                            </Link>
                            <Link to="/Ecomerce/products" className="hover:underline flex font-[Roboto]">
                                Productos{" "}
                                <span>
                                    <ChevronDownIcon className="h-6 w-6 cursor-pointer hover:underline" />
                                </span>
                            </Link>
                            <a href="#" className="hover:underline font-[Roboto]">
                                Conócenos
                            </a>
                            <a href="#" className="hover:underline font-[Roboto]">
                                Centro de Ayuda
                            </a>
                        </nav>
                    </div>
                ) : (
                    // ——— Navegación para USUARIO LOGUEADO ———
                    <div>
                        <div className="bg-black text-white flex items-center justify-end pr-16 px-6 py-3">
                            <div className="w-1/5">
                                <img src={logo} alt="Logo Ecomerce" className="w-14" />
                            </div>
                            <div className="flex items-center bg-white rounded-md overflow-hidden w-1/2">
                                <input
                                    type="text"
                                    placeholder="   ¿Qué producto estás buscando hoy?"
                                    className="w-full p-1.5 text-black outline-none font-[Roboto]"
                                />
                                <button className="bg-yellow-500 p-1.5 cursor-pointer">
                                    <MagnifyingGlassIcon className="h-6 w-6 text-black" />
                                </button>
                            </div>

                            <div className="flex items-center space-x-6 w-1/4 justify-end">
                                <Link to="/notifications">
                                    <BellIcon className="h-6 w-6 text-white cursor-pointer" />
                                </Link>

                                <Link to="/Ecomerce/ShoppingCart">
                                    <div className="relative">
                                        <ShoppingCartIcon className="h-6 w-6 text-white cursor-pointer" />
                                        {quantityProducts > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                {quantityProducts}
                                            </span>
                                        )}
                                    </div>
                                </Link>

                                <Link to="/profile">
                                    <UserCircleIcon className="h-8 w-8 text-white cursor-pointer" />
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 text-white p-1.5 rounded-md font-semibold px-4 cursor-pointer"
                                >
                                    Cerrar sesión
                                </button>
                            </div>
                        </div>

                        <nav className="bg-gray-500 text-white flex gap-2.5 items-center space-x-6 px-6 py-2 pl-20">
                            <button className="text-lg">☰</button>
                            <Link to="/" className="hover:underline font-[Roboto]">
                                Inicio
                            </Link>
                            <Link to="/Ecomerce/products" className="hover:underline flex font-[Roboto]">
                                Productos{" "}
                                <span>
                                    <ChevronDownIcon className="h-6 w-6 cursor-pointer hover:underline" />
                                </span>
                            </Link>
                            <a href="#" className="hover:underline font-[Roboto]">
                                Conócenos
                            </a>
                            <a href="#" className="hover:underline font-[Roboto]">
                                Centro de Ayuda
                            </a>
                        </nav>
                    </div>
                )}
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}
