import React from "react"
import {LockClosedIcon} from "@heroicons/react/24/solid"

const PagoExitoso = () => {
  return (
    <div className="bg-gray-100 min-h-screen relative">
      {/* Banner verde de éxito */}
      <div className="absolute box-border w-[1366px] h-[120px] left-0 top-[93px] bg-green-400 text-white flex justify-center items-center border border-black">
        <h1 className="text-2xl font-bold">¡Pago exitoso!</h1>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto p-6 pt-[220px]">
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
              <span className="font-semibold">Nombre:</span> Juan
            </p>
            <p>
              <span className="font-semibold">Medio de Pago:</span> Tarjeta Visa
            </p>
            <p>
              <span className="font-semibold">ID de Pago:</span> 348953003
            </p>
            <p>
              <span className="font-semibold">Fecha y Hora:</span> 3 de
              diciembre de 2020 - 11:30 a.m.
            </p>
            <p>
              <span className="font-semibold">Valor:</span> $110.000
            </p>
            <p>
              <span className="font-semibold">Estado:</span> Aprobado
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
            <span className="text-sm font-semibold">ID: 01253</span>
          </div>

          {/* Productos */}
          <div className="border-t border-b py-4 space-y-4">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Camisa</p>
                <p className="text-xs text-gray-500">Referencia: 233409424</p>
                <p className="text-xs text-gray-500">
                  Envío: Acodar con el vendedor
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$45.000</p>
                <p className="text-xs text-gray-500">Cantidad: 1</p>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <p className="font-semibold">Camisa</p>
                <p className="text-xs text-gray-500">Referencia: 233409424</p>
                <p className="text-xs text-gray-500">Envío: Incluido</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">$45.000</p>
                <p className="text-xs text-gray-500">Cantidad: 1</p>
              </div>
            </div>
          </div>

          {/* Totales */}
          <div className="bg-blue-100 p-4 mt-4 rounded-lg text-sm">
            <p>2 productos en total</p>
            <p>Sub-total: $90.000</p>
            <p>IVA: $20.000</p>
          </div>

          {/* Total final */}
          <div className="flex justify-end mt-4">
            <div className="text-right">
              <p className="text-lg font-bold">
                Total: <span className="text-blue-600">$110.000</span>
              </p>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => window.print()}
              className="border border-blue-500 text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-blue-100"
            >
              Imprimir Resumen
            </button>
            <a
              href="/mis-compras"
              className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Mis Compras
            </a>
          </div>
        </div>

        {/* Ayuda */}
        <div className="text-center text-xs text-gray-500 mt-6">
          Si tienes dudas o dificultades con tu proceso de pago, no dudes en
          contactarnos en nuestro{" "}
          <a href="#" className="text-blue-500 underline">
            WhatsApp
          </a>
          . ¡Estamos para ayudarte!
        </div>
      </div>
    </div>
  )
}

export default PagoExitoso
