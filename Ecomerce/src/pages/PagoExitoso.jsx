import React, { useEffect, useState } from "react"
import { useDispatch, useSelector  } from "react-redux";
import {LockClosedIcon} from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"
import { getSale } from "../services/SaleService";
import { clearCart } from "../data/CartSlice";

const PagoExitoso = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [data, setData] = useState();
    const { saleId, sessionId } = useSelector((state) => state.cart)
    useEffect(() => {
        console.log("Venta creada con:", saleId);
        const fetchSaleData = async () => {
            try {
                const response = await dispatch(getSale(saleId, sessionId, navigate));
                setData(response);
                setTimeout(() => {
                    dispatch(clearCart());
                }, 0);
            } catch (error) {
                console.error("Error fetching sale data:", error);
            }
        };
        fetchSaleData();
    }, [dispatch,saleId, sessionId, navigate]);

    if (!data) {
        return <div className="text-center py-10 text-gray-500">Cargando datos de la compra...</div>;
    }

    const { shoppingCart } = data
    const products = shoppingCart?.shoppingCartProducts || []

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="bg-green-500 text-white py-8 mb-8 shadow-lg">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-3xl font-bold">¡Pago exitoso!</h1>
                    <p className="mt-2">Tu compra se ha realizado correctamente</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-2xl font-bold text-center mb-6">Tu Compra se Pagó Exitosamente</h2>

                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LockClosedIcon className="h-5 w-5 text-blue-600" />
                        Detalles de la Transacción
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                        <p><span className="font-semibold">ID de Pago:</span> {data.saleId}</p>
                        <p><span className="font-semibold">Fecha y Hora:</span> {new Date().toLocaleString()}</p>
                        <p><span className="font-semibold">Valor:</span> ${data.totalAmount}</p>
                        <p><span className="font-semibold">Estado:</span> <span className="text-green-600 font-semibold">Aprobado</span></p>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <LockClosedIcon className="h-5 w-5 text-blue-600" />
                            Resumen de la Compra
                        </h3>
                    </div>

                    <div className="border-t border-b py-4 space-y-4">
                        {products.map((item) => {
                            const { product, quantity, price } = item
                            const image = product.productImages?.[0]?.imageUrl || ""
                            return (
                                <div key={item.shoppingCartProductId} className="flex items-center gap-4">
                                    <img src={image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex-1">
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-gray-500">{product.brand.name}</p>
                                        <p className="text-sm text-gray-500">Cantidad: {quantity}</p>
                                    </div>
                                    <div className="text-sm font-semibold text-gray-700">
                                        ${price * quantity}
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    <div className="bg-blue-50 p-4 mt-4 rounded-lg text-sm">
                        <p>{shoppingCart.quantityProducts} producto(s) en total</p>
                        <p>Sub-total: ${shoppingCart.subtotal}</p>
                        <p>IVA: ${shoppingCart.tax}</p>
                    </div>


                    <div className="flex justify-end mt-4">
                        <div className="text-right">
                            <p className="text-lg font-bold">Total: <span className="text-blue-600">${shoppingCart.total}</span></p>
                        </div>
                    </div>

                    <div className="flex justify-between mt-6">
                        <button onClick={() => window.print()} className="border border-blue-500 text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-blue-100 transition">
                            Imprimir Resumen
                        </button>
                        <button onClick={() => navigate("/")} className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 transition">
                            Volver a la Tienda
                        </button>
                    </div>
                </div>

                <div className="text-center text-sm text-gray-500 mt-6">
                    Si tienes dudas o dificultades con tu proceso de pago, no dudes en contactarnos en nuestro{" "}
                    <a href="#" className="text-blue-500 hover:text-blue-700 underline">WhatsApp</a>. ¡Estamos para ayudarte!
                </div>
            </div>
        </div>
    )
}

export default PagoExitoso