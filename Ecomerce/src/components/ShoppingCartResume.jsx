import React from "react"

const ShoppingCartResume = ({ quantityProducts,total, iva, subtotal }) => {
        const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        });
      

    return (
        <div>
            <h2 className="font-semibold text-lg mb-4">Resumen de la compra</h2>
            <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                    <span>Cantidad de articulos</span>
                    <span>{quantityProducts}</span>
                </div>
                <div className="flex justify-between">
                    <span>Sub-total</span>
                    <span>{formatter.format(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                    <span>IVA</span>
                    <span>{formatter.format(iva)}</span>
                </div>
                <div className="flex justify-between font-bold text-blue-600 text-base mt-2">
                    <span>Total</span>
                    <span>{formatter.format(total)}</span>
                </div>
            </div>
        </div>
    )
}

export default ShoppingCartResume
