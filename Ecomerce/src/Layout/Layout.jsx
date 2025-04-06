import React from "react"
import {Outlet} from "react-router-dom"
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline"
import Footer from "../components/Footer"

const Layout = () => {
  return (
    <div>
      <header className="">
        <div className="bg-black text-white flex items-center justify-between pr-16 px-6 py-3">
          <div className="w-1/5"></div>
          <div className="flex items-center bg-white  rounded-md overflow-hidden w-1/2">
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
            <button className=" bg-white p-1.5 rounded-md text-gray-700 font-semibold px-4 cursor-pointer">
              Crear Cuenta
            </button>
            <button className=" bg-black p-1.5 rounded-md border border-white font-semibold px-4 cursor-pointer">
              Iniciar sesion
            </button>
            <ShoppingCartIcon className="h-6 w-6 cursor-pointer mt-2" />
          </div>
        </div>

        <nav className="bg-gray-500 text-white flex gap-2.5 items-center space-x-6 px-6 py-2 pl-20">
          <button className="text-lg">☰</button>
          <a href="#" className="hover:underline font-[Roboto]">
            Inicio
          </a>
          <a href="#" className="hover:underline flex font-[Roboto]">
            Productos{" "}
            <span>
              <ChevronDownIcon className="h-6 w-6 cursor-pointer over:underline" />
            </span>
          </a>
          <a href="#" className="hover:underline font-[Roboto]">
            Conócenos
          </a>
          <a href="#" className="hover:underline font-[Roboto]">
            Centro de Ayuda
          </a>
        </nav>
      </header>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
