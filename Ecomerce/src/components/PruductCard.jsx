import React from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {postAddProduct} from "../services/CartService"

const ProductCard = ({product}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {sessionId} = useSelector((state) => state.cart)

  // Validar que el producto exista
  if (!product) {
    return <div>Producto no disponible</div>
  }

  // Obtener valores seguros
  const imageUrl = product.productImages?.[0]?.imageUrl || ""
  const brandName = product.brand?.name || "Sin marca"
  const categories = product.categories || []
  const stock = product.productVariants?.[0]?.stock || 0
  const rating = product.rating || 0

  const handleProductClick = () => {
    navigate(`/Ecomerce/product/${product.productId}`)
  }

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (product.productVariants?.[0]?.productVariantId) {
      dispatch(
        postAddProduct(
          product.productId,
          1,
          product.productVariants[0].productVariantId,
          sessionId
        )
      )
    }
  }

  return (
    <div
      className="bg-white rounded-lg m-2 shadow-md overflow-hidden w-64 cursor-pointer"
      onClick={handleProductClick}
    >
      <div className="p-2">
        <span className="bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded">
          NUEVO
        </span>
      </div>

      <div className="flex justify-center items-center p-4">
        <img
          src={imageUrl}
          alt={product.name || "Producto"}
          className="h-48 object-cover"
        />
      </div>

      <div className="px-4 pb-4">
        <p className="text-gray-400 text-xs uppercase font-sans">{brandName}</p>
        <h3 className="font-bold text-lg mt-1 mb-4 line-clamp-2 h-14">
          {product.name || "Sin nombre"}
        </h3>

        <div className="flex my-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{
                color: rating >= i + 1 ? "#FFD700" : "#E0E0E0",
              }}
            >
              <path d="M12 .587l3.668 7.431L24 9.75l-6 5.849L19.335 24 12 19.896 4.665 24 6 15.599 0 9.75l8.332-1.732z" />
            </svg>
          ))}
          <span className="text-xs text-gray-400 ml-2">({rating})</span>
        </div>

        {/* Información vendedor y categorías */}
        <div className="text-gray-500 text-xs mt-2">
          MARCA: <span className="font-bold">{brandName}</span>
          <br />
          CATEGORÍAS:{" "}
          <span className="font-bold">
            {categories.map((cat) => cat.name).join(", ") || "Sin categorías"}
          </span>
        </div>

        {/* Precio y unidades disponibles */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-blue-600 text-2xl font-bold">
            ${product.price || 0}
          </p>
          <p className="text-green-500 text-sm">{stock} uds.</p>
        </div>

        {/* Botón de añadir al carrito */}
        {/* <button
          type="button"
          onClick={handleAddToCart}
          className="mt-4 w-full flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 font-semibold py-2 rounded hover:bg-blue-600 hover:text-white transition-colors"
        >
          <FaShoppingCart />
          Añadir al carrito
        </button> */}
      </div>
    </div>
  )
}

export default ProductCard
