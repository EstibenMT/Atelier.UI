import React, { useState, useEffect } from "react";
import ShoppingCartCard from "../components/ShoppingCartCard";
import ShoppingCartResume from "../components/ShoppingCartResume";
import AddressForm from "../components/AddressForm";
import { useSelector, useDispatch } from "react-redux";
import { saveAddress, addSaleId } from "../data/CartSlice";
import { postSale} from "../services/SaleService";
import { fetchCartData, getCheckout } from "../services/CartService";
import { useNavigate } from "react-router-dom";
import { GiShoppingCart } from "react-icons/gi";



const ShoppingCart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shoppingCartProducts, quantityProducts, total, iva, subtotal, sessionId, shoppingCartId, address, email, document } = useSelector(state => state.cart);
    const userId = useSelector((state) => state.auth.userId) ?? null;
    const [mode, setMode] = useState("cart");
    const [buttonMode, setButtonMode] = useState("cart");

    useEffect(() => {
        if (sessionId && sessionId.trim() !== "") {
            dispatch(fetchCartData(sessionId,userId));
        }
    }, [dispatch, sessionId, userId]);

    function validarStock(stockValidation, carrito) {
        const mensajes = [];

        const productosCarrito = {};
        carrito.forEach(producto => {
            productosCarrito[producto.shoppingCartProductId] = producto.product.name;
        });

        stockValidation.forEach(validacion => {
            if (validacion.adjusted) {
                const nombreProducto = productosCarrito[validacion.shoppingCartProductId] || "Producto desconocido";
                mensajes.push(`El producto "${nombreProducto}" ha sido ajustado: ${validacion.message}`);
            }
        });

        return mensajes;
    }

    const handleAddressSave = (address, email, document ) => {
        dispatch(saveAddress({
            address: address,
            email: email,
            document: document
        }));
        setButtonMode("pay");
    };

    const handleAddressEdit = () => {
        setButtonMode("wait");
    };
    const handleContinue = async (e) => {
        e.preventDefault();
        try {
            const stockValidation = await dispatch(getCheckout(sessionId, navigate));
            const mensajes = validarStock(stockValidation, shoppingCartProducts);

            if (mensajes.length > 0) {
                alert("Se realizaron los siguientes ajustes en tu carrito:\n\n" + mensajes.join("\n"));
                setMode("cart");
                setButtonMode("cart");
                dispatch(fetchCartData(sessionId));
                return;
            }

            setMode("Address");
            if (address &&
                address.streetType?.name &&
                address.description &&
                address.number &&
                address.city?.name &&
                address.state?.name &&
                address.country?.name &&
                email &&
                document) {
                    setButtonMode("pay")
                } else {
                    setButtonMode("wait");
                }
        } catch (error) {
            console.error("Error al procesar la venta:", error)
        }
    };
    const handlePay = async (e) => {
        e.preventDefault();
        try {
            const stockValidation = await dispatch(getCheckout(sessionId, navigate));
            

            const mensajes = validarStock(stockValidation, shoppingCartProducts);

            if (mensajes.length > 0) {
                alert("Se realizaron los siguientes ajustes en tu carrito:\n\n" + mensajes.join("\n"));
                setMode("cart");
                setButtonMode("cart");
                dispatch(fetchCartData(sessionId)); 
                return;
            }

            const result = await dispatch(postSale(
                shoppingCartId,
                sessionId,
                email,
                document,
                total,
                address,
                navigate
            ));
            const saleId = result.data.saleId;
            await dispatch(addSaleId({ saleId }));
            navigate("/Ecomerce/Pagos");
            
        } catch (error) {
            console.error("Error al procesar la venta:", error)
        }
        setButtonMode("");
        
    };
    return (
        <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-128">
            {quantityProducts === 0 ? (
                <div className="col-span-3 flex flex-col items-center justify-center bg-white p-10 rounded shadow-sm text-center h-70">
                    <GiShoppingCart className="w-20 h-20 mb-4 text-gray-400 rotate-350" />
                    <h2 className="text-lg font-medium text-gray-700">Tu carrito de compras esta vacio</h2>
                    <p className="text-sm text-gray-500">
                        Empieza a comprar ahora 
                        <a href="/Ecomerce/products" className="text-blue-600 hover:underline">
                            Ver productos
                        </a>
                    </p>
                </div>
            ) : (
                <>
                        <div className="md:col-span-2">
                            {mode === "cart" ? (
                                <div className="bg-white rounded-lg shadow-sm">
                                    <form >
                                        <h1 className="font-semibold text-lg p-4 border-b">
                                            Carrito de compras ({quantityProducts}) articulos
                                        </h1>
                                        {shoppingCartProducts.map((shoppingCartProduct, index) => (
                                            <ShoppingCartCard key={index}
                                                shoppingCartProduct={shoppingCartProduct}
                                            />
                                        ))}
                                    </form>
                                </div>
                                
                            ) : (
                                    <AddressForm onSaveAddress={handleAddressSave} onEditAddress={handleAddressEdit} />
                            )}
                        </div>
                        <div className="p-4 rounded-lg shadow-sm bg-white h-60">
                            <ShoppingCartResume quantityProducts={quantityProducts}
                                total={total}
                                iva={iva}
                                subtotal={subtotal}
                                onContinue={handleContinue} />
                            {buttonMode === "cart" ? (
                                <form className="">
                                    <button type="button" onClick={handleContinue} className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded hover:bg-blue-700 transition">
                                        Continuar
                                    </button>
                                </form>
                            ):buttonMode === "wait" ? (
                                <form className="">
                                        <button disabled className="w-full bg-blue-200 text-white font-semibold py-2 mt-4 rounded">
                                        Continuar
                                    </button>
                                </form>
                            ) : (
                                <button type="button" onClick={handlePay} className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded hover:bg-blue-700 transition">
                                    Ir a pagar
                                </button>
                            )}
                        </div>
                    </>
                     )}
                </div>
            );
}

export default ShoppingCart
