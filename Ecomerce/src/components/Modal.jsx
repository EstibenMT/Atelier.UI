import React from "react"
import {FaCheck} from "react-icons/fa"

const Modal = ({isOpen, onClose, product}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Producto agregado</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <FaCheck className="text-green-500 text-2xl" />
          </div>
          <div>
            <p className="font-medium">{product?.name}</p>
            <p className="text-sm text-gray-500">
              Se ha agregado al carrito de compras
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Seguir comprando
          </button>
          <button
            onClick={() => {
              onClose()
              window.location.href = "/Ecomerce/ShoppingCart"
            }}
            className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Ver carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
