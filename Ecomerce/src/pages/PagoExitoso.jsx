import React from "react"
import {LockClosedIcon} from "@heroicons/react/24/solid"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

const PagoExitoso = () => {
  const navigate = useNavigate()
  const {total, iva, subtotal, quantityProducts, shoppingCartProducts} =
    useSelector((state) => state.cart)

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Banner verde de éxito */}
      <div className="bg-green-500 text-white py-8 mb-8 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold">¡Pago exitoso!</h1>
          <p className="mt-2">Tu compra se ha realizado correctamente</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          Tu Compra se Pagó Exitosamente
        </h2>

        {/* Detalles de la Transacción */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <LockClosedIcon className="h-5 w-5 text-blue-600" />
            Detalles de la Transacción
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              <span className="font-semibold">ID de Pago:</span>{" "}
              {Math.floor(Math.random() * 1000000000)}
            </p>
            <p>
              <span className="font-semibold">Fecha y Hora:</span>{" "}
              {new Date().toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Valor:</span>{" "}
              {total.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </p>
            <p>
              <span className="font-semibold">Estado:</span>{" "}
              <span className="text-green-600 font-semibold">Aprobado</span>
            </p>
          </div>
        </div>

        {/* Resumen de la Compra */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <LockClosedIcon className="h-5 w-5 text-blue-600" />
              Resumen de la Compra
            </h3>
          </div>

          {/* Productos */}
          <div className="border-t border-b py-4 space-y-4">
            {shoppingCartProducts.map((item) => (
              <div key={item.productId} className="flex justify-between">
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-xs text-gray-500">
                    Referencia:{" "}
                    {item.product.productVariants[0]?.productVariantId}
                  </p>
                  <p className="text-xs text-gray-500">Envío: Incluido</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${item.product.price.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    Cantidad: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="bg-blue-50 p-4 mt-4 rounded-lg text-sm">
            <p>{quantityProducts} productos en total</p>
            <p>
              Sub-total:{" "}
              {subtotal.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </p>
            <p>
              IVA:{" "}
              {iva.toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </p>
          </div>

          {/* Total final */}
          <div className="flex justify-end mt-4">
            <div className="text-right">
              <p className="text-lg font-bold">
                Total:{" "}
                <span className="text-blue-600">
                  {total.toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })}
                </span>
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => window.print()}
              className="border border-blue-500 text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition"
            >
              Imprimir Resumen
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Volver a la Tienda
            </button>
          </div>
        </div>

        {/* Ayuda */}
        <div className="text-center text-sm text-gray-500 mt-6">
          Si tienes dudas o dificultades con tu proceso de pago, no dudes en
          contactarnos en nuestro{" "}
          <a href="#" className="text-blue-500 hover:text-blue-700 underline">
            WhatsApp
          </a>
          . ¡Estamos para ayudarte!
        </div>
      </div>
    </div>
  )
}

export default PagoExitoso
