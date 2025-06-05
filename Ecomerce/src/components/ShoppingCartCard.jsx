import React from "react"
import Counter from "../components/Counter"
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { putdeleteProduct, postAddProduct } from "../services/CartService"

const ShoppingCartCard = ({ shoppingCartProduct}) => {
    const dispatch = useDispatch();
    const { sessionId } = useSelector(state => state.cart);

    const handleDeleteProduct = () => {
        dispatch(putdeleteProduct(shoppingCartProduct.productId,
            shoppingCartProduct.quantity,
            shoppingCartProduct.product.productVariants[0]?.productVariantId,
            sessionId));
    };
    const handleIncrement = () => {
        dispatch(postAddProduct(
            shoppingCartProduct.productId,
            1,
            shoppingCartProduct.product.productVariants[0]?.productVariantId,
            sessionId
        ));
    };

    const handleDecrement = () => {
        dispatch(postAddProduct(
            shoppingCartProduct.productId,
            -1,
            shoppingCartProduct.product.productVariants[0]?.productVariantId,
            sessionId
        ));
    };
    
    return (
        <div className="flex justify-between p-4 border-b md:col-span-2 bg-white rounded-lg shadow-sm ">
            <div className="flex gap-10">
                <img
                    src={shoppingCartProduct.product.productImages[0]?.imageUrl}
                    alt={shoppingCartProduct.product.name}
                    className="w-24 h-30 object-cover"
                />          
                <div>
                    <p className="font-bold">{shoppingCartProduct.product.name}</p>
                    <p className="text-sm text-gray-500">Referencia: {shoppingCartProduct.product.productVariants[0]?.productVariantId}</p>
                    <p className="text-sm text-gray-500">Talla: {shoppingCartProduct.product.productVariants[0]?.size.name}</p>
                    <p className="text-sm text-gray-500">Color: {shoppingCartProduct.product.productVariants[0]?.color.name}</p>
                    <p className="text-green-600 text-sm mt-1">{shoppingCartProduct.product.productVariants[0]?.stock} disponibles</p>
                    <p className="text-sm text-gray-500">Envío: Incluido</p>
                    <p className="text-sm text-gray-500">Mínimo para compra: 1</p>
                    <button
                        type="button"
                        onClick={handleDeleteProduct}
                        className="text-red-500 hover:text-red-700 hover:underline transition-colors duration-200 p-0 flex items-center text-sm mt-2">
                        <FaRegTrashAlt size={16} className="mr-1" />
                        Eliminar Producto
                    </button> 
                </div>
            </div>
            <div className="text-right">
                <Counter
                    value={shoppingCartProduct.quantity}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    max={shoppingCartProduct.product.productVariants[0]?.stock}
                />
                <p className="font-semibold">${shoppingCartProduct.product.price}</p>
                <p className="text-green-600 text-sm">Exento de IVA</p>
            </div>
        </div>
    )
}

export default ShoppingCartCard
