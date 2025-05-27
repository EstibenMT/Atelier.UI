import React, {useState, useEffect} from "react"
import ShoppingCartCard from "../components/ShoppingCartCard"
import ShoppingCartResume from "../components/ShoppingCartResume"
import AddressForm from "../components/AddressForm"
import {useSelector, useDispatch} from "react-redux"
import {saveAddress, addSaleId} from "../data/CartSlice"
import {postSale} from "../services/SaleService"
import {fetchCartData} from "../services/CartService"
import {useNavigate} from "react-router-dom"

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    shoppingCartProducts,
    quantityProducts,
    total,
    iva,
    subtotal,
    sessionId,
    shoppingCartId,
    address,
    email,
    document,
  } = useSelector((state) => state.cart)
  const [mode, setMode] = useState("cart")
  const [buttonMode, setButtonMode] = useState("cart")

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchCartData(sessionId))
    }
  }, [dispatch, sessionId])

  const handleAddressSave = (address, email, document) => {
    dispatch(
      saveAddress({
        address: address,
        email: email,
        document: document,
      })
    )
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
    try {
      const result = await postSale(
        shoppingCartId,
        sessionId,
        email,
        document,
        total,
        address
      )
      const saleId = result.data.saleId
      await dispatch(addSaleId({saleId}))
      navigate("/Ecomerce/Pagos")
    } catch (error) {
      console.error("Error al procesar la venta:", error)
    }
    setButtonMode("")
  }
  return (
    <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-100">
      <div className="md:col-span-2 bg-white rounded-lg shadow-sm ">
        {mode === "cart" ? (
          <form className="space-y-4">
            <h1 className="font-semibold text-lg p-4 border-b">
              Carrito de compras ({quantityProducts}) articulos
            </h1>
            {shoppingCartProducts.map((shoppingCartProduct, index) => (
              <ShoppingCartCard
                key={index}
                shoppingCartProduct={shoppingCartProduct}
              />
            ))}
          </form>
        ) : (
          <AddressForm
            onSaveAddress={handleAddressSave}
            onEditAddress={handleAddressEdit}
          />
        )}
      </div>
      <div className="p-4 rounded-lg shadow-sm bg-white h-60">
        <ShoppingCartResume
          quantityProducts={quantityProducts}
          total={total}
          iva={iva}
          subtotal={subtotal}
          onContinue={handleContinue}
        />
        {buttonMode === "cart" ? (
          <form className="">
            <button
              type="button"
              onClick={handleContinue}
              className="w-full bg-blue-600 text-white font-semibold py-2 mt-4 rounded hover:bg-blue-700 transition"
            >
              Continuar
            </button>
          </form>
        ) : buttonMode === "wait" ? (
          <form className="">
            <button
              disabled
              className="w-full bg-blue-200 text-white font-semibold py-2 mt-4 rounded"
            >
              Continuar
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={handlePay}
            className="w-full bg-blue-600 text-white cursor-pointer font-semibold py-2 mt-4 rounded hover:bg-blue-700 transition"
          >
            Ir a pagar
          </button>
        )}
      </div>
    </div>
  )
}

export default ShoppingCart
