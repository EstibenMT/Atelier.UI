import React from "react"
import {ShoppingCartIcon} from "@heroicons/react/24/outline"
import {CgShoppingBag} from "react-icons/cg"
import {Link} from "react-router-dom"
const AccesosRapidos = () => {
  return (
    <div>
      <div className="max-w-7xl w-full bg-white p-4 mt-4 rounded-lg flex justify-center space-x-8 mx-auto">
        <Link to="/Ecomerce/products">
          <div className="flex flex-col items-center">
            <span
              style={{backgroundColor: "#E4ECFF"}}
              className="rounded-full p-5 flex justify-center items-center cursor-pointer"
            >
              <CgShoppingBag className="h-6 w-6 text-blue-500" />
            </span>

            <p className="text-gray-600">Catálogo</p>
          </div>
        </Link>
      <Link to="/Ecomerce/ShoppingCart">
        <div className="flex flex-col items-center">
          <span
            style={{backgroundColor: "#E4ECFF"}}
            className="rounded-full p-5 flex justify-center items-center cursor-pointer"
          >
            <ShoppingCartIcon className="h-6 w-6 text-blue-500" />
          </span>
          <p className="text-gray-600">Carrito</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AccesosRapidos
