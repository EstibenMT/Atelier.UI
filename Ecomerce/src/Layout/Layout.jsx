import React, {useEffect, useState} from "react"
import {Link, Outlet, useNavigate, useLocation} from "react-router-dom"
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import Footer from "../components/Footer"
import logo from "../assets/LogoB.png"
import {useSelector, useDispatch} from "react-redux"
import {fetchCartData} from "../services/CartService"

const Layout = () => {
  const dispatch = useDispatch()
  const {quantityProducts, sessionId} = useSelector((state) => state.cart)
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
      if (sessionId && sessionId.trim() !== "") {
      dispatch(fetchCartData())
    }
  }, [dispatch, sessionId])

  // Actualiza el query param 'search' en la URL y navega a /Ecomerce/products
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (value.trim() !== "") {
      navigate(`/Ecomerce/products?search=${encodeURIComponent(value)}`)
    } else if (location.pathname.startsWith("/Ecomerce/products")) {
      navigate(`/Ecomerce/products`)
    }
  }

  const handleSearchClick = (e) => {
    e.preventDefault()
    if (searchTerm.trim() !== "") {
      navigate(`/Ecomerce/products?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <div>
      <header className="">
        <div className="bg-black text-white flex items-center justify-end pr-16 px-6 py-3">
          <div className="w-1/5">
            <img src={logo} alt="Logo Ecomerce" className=" w-14" />
          </div>
          <div className="flex items-center bg-white  rounded-md overflow-hidden w-1/2">
            <input
              type="text"
              placeholder="   ¿Qué producto estás buscando hoy?"
              className="w-full p-1.5 text-black outline-none font-[Roboto]"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className="bg-yellow-500 p-1.5 cursor-pointer"
              onClick={handleSearchClick}
            >
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
            <Link to="/Ecomerce/ShoppingCart">
              <div className="relative">
                <ShoppingCartIcon className="h-6 w-6 cursor-pointer mt-2" />
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
          <Link to="/" href="#" className="hover:underline font-[Roboto]">
            Inicio
          </Link>
          <Link
            to="/Ecomerce/products"
            href="#"
            className="hover:underline flex font-[Roboto]"
          >
            Productos <span></span>
          </Link>
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
