import {postAddProduct} from "../services/CartService"
import {getSessionId} from "../data/Seccion"

const handleAddToCart = () => {
  const sessionId = getSessionId()
  dispatch(
    postAddProduct(
      product.id, // productId
      1, // quantity
      product.variantId, // productVariantId
      sessionId // sessionId
    )
  )
}

;<button onClick={handleAddToCart} className="btn btn-primary">
  Agregar al carrito
</button>
