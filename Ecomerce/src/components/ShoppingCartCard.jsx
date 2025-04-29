import React from "react"
import Counter from "../components/Counter"
import { FaRegTrashAlt } from "react-icons/fa";


const ShoppingCartCard = ({ shoppingCartProduct, onIncrement, onDecrement }) => {
    
    return (
        <div className="flex justify-between p-4 border-b">
            <div className="flex gap-10">
                <img
                    src={shoppingCartProduct.product.productImages[0]?.imageUrl}
                    alt={shoppingCartProduct.product.name}
                    className="w-24 h-30 object-cover"
                />          
                <div>
                    <p className="font-bold">{shoppingCartProduct.product.name}</p>
                    <p className="text-sm text-gray-500">Referencia: {shoppingCartProduct.product.productVariants[0]?.productVariantId}</p>
                    <p className="text-green-600 text-sm mt-1">{shoppingCartProduct.product.productVariants[0]?.stock} disponibles</p>
                    <p className="text-sm text-gray-500">Envío: Incluido</p>
                    <p className="text-sm text-gray-500">Mínimo para compra: 1</p>
                    <button type="button" variant="link" className="text-red-500 p-0 flex items-center text-sm mt-2">
                        <FaRegTrashAlt size={16} className="mr-1" />
                        Eliminar Producto
                    </button> 
                </div>
            </div>
            <div className="text-right">
                <Counter value={shoppingCartProduct.quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
                <p className="font-semibold">${shoppingCartProduct.product.price}</p>
                <p className="text-green-600 text-sm">Exento de IVA</p>
            </div>
        </div>
    )
}

export default ShoppingCartCard
