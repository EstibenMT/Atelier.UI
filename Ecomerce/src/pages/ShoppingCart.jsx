import React, {useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"
import ShoppingCartCard from "../components/ShoppingCartCard"
import ShoppingCartResume from "../components/ShoppingCartResume"
import AddressForm from "../components/AddressForm"
import {useSelector, useDispatch} from "react-redux"
import {saveAddress, clearCart} from "../data/CartSlice"
import {fetchCartData, clearShoppingCart} from "../services/CartService"
import {createSale} from "../services/SaleService"

const ShoppingCart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    shoppingCartProducts,
    quantityProducts,
    total,
    iva,
    subtotal,
    sessionId,
    address,
  } = useSelector((state) => state.cart)
  const [mode, setMode] = useState("cart")
  const [buttonMode, setButtonMode] = useState("cart")
  const [isInitialized, setIsInitialized] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (sessionId && !isInitialized) {
      dispatch(clearShoppingCart(sessionId)).then(() => {
        setIsInitialized(true)
      })
    }
  }, [dispatch, sessionId, isInitialized])

  useEffect(() => {
    if (sessionId && isInitialized) {
      dispatch(fetchCartData(sessionId))
    }
  }, [dispatch, sessionId, isInitialized])

  const handleAddressSave = (addressData) => {
    dispatch(saveAddress(addressData))
    setButtonMode("pay")
  }

  const handleAddressEdit = () => {
    setButtonMode("wait")
  }

  const handleContinue = (e) => {
    e.preventDefault()
    setMode("Address")
    setButtonMode("wait")
  }

  const handlePay = async (e) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Validar que haya productos en el carrito
      if (!shoppingCartProducts || shoppingCartProducts.length === 0) {
        throw new Error("No hay productos en el carrito")
      }

      // Obtener el ID del carrito del primer producto
      const shoppingCartId = shoppingCartProducts[0]?.shoppingCartId
      if (!shoppingCartId) {
        throw new Error("ID del carrito de compras no encontrado")
      }

      // Validar que la dirección esté completa
      if (
        !address ||
        !address.streetTypeId ||
        !address.cityId ||
        !address.stateId ||
        !address.countryId
      ) {
        throw new Error("Por favor complete todos los campos de la dirección")
      }

      const saleData = {
        shoppingCartId: shoppingCartId,
        sessionId: sessionId,
        paymentMethodId: 1,
        email: address.email,
        document: address.document,
        totalAmount: total,
        address: {
          addressId: 0,
          complement: address.referencia || "",
          postalCode: "",
          description: `${address.nombreSufijo}`,
          number: `${address.numero1}-${address.numero2}`,
          streetTypeId: parseInt(address.streetTypeId),
          cityId: parseInt(address.cityId),
          stateId: parseInt(address.stateId),
          countryId: parseInt(address.countryId),
        },
      }

      await createSale(saleData)
      dispatch(clearCart())
      navigate("/Ecomerce/Pagos")
    } catch (error) {
      console.error("Error al procesar el pago:", error)
      // Aquí deberías mostrar un mensaje de error al usuario
      alert(error.message || "Error al procesar el pago")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-100">
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm ">
        {mode === "cart" ? (
          <div className="space-y-4">
            <h1 className="font-semibold text-lg p-4 border-b">
              Carrito de compras ({quantityProducts}) articulos
            </h1>
            {shoppingCartProducts && shoppingCartProducts.length > 0 ? (
              shoppingCartProducts.map((shoppingCartProduct) => (
                <ShoppingCartCard
                  key={shoppingCartProduct.productId}
                  shoppingCartProduct={shoppingCartProduct}
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                No hay productos en el carrito
              </div>
            )}
          </div>
        ) : (
          <AddressForm
            onSaveAddress={handleAddressSave}
            onEditAddress={handleAddressEdit}
          />
        )}
      </div>
      <div className="p-4 rounded-lg shadow-sm bg-white h-fit">
        <ShoppingCartResume
          quantityProducts={quantityProducts}
          total={total}
          iva={iva}
          subtotal={subtotal}
        />
        {buttonMode === "cart" && shoppingCartProducts.length > 0 ? (
          <button
            type="button"
            onClick={handleContinue}
            className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded hover:bg-blue-700 transition"
          >
            Continuar
          </button>
        ) : buttonMode === "wait" ? (
          <button
            disabled
            className="w-full bg-blue-200 text-white font-semibold py-2 mt-4 rounded"
          >
            Continuar
          </button>
        ) : buttonMode === "pay" ? (
          <button
            type="button"
            onClick={handlePay}
            disabled={isProcessing}
            className={`w-full ${
              isProcessing ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-semibold py-2 mt-4 rounded transition flex justify-center items-center`}
          >
            {isProcessing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Procesando...
              </>
            ) : (
              "Ir a pagar"
            )}
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default ShoppingCart
