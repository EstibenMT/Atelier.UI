import React, {useState, useEffect} from "react"
import {ShoppingCartIcon} from "@heroicons/react/24/outline"
import {useParams} from "react-router-dom"
import { productService } from "../services/productService"
import { useDispatch, useSelector } from "react-redux";
import { postAddProduct } from "../services/CartService"

const ProductDetail = () => {
  const {id} = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

    const dispatch = useDispatch();
    const { sessionId } = useSelector(state => state.cart);
    

    const handleAddProduct = () => {
        if (!selectedSize || !selectedColor) {
            alert("Por favor selecciona talla y color antes de agregar al carrito.")
            return
        }

        // Encontrar variante correcta
        const variant = product.productVariants.find(
            (v) => v.size.name === selectedSize && v.color.name === selectedColor
        )
        if (!variant) {
            alert("No se encontró una variante para la combinación seleccionada.")
            return
        }
        dispatch(postAddProduct(id,1, variant.productVariantId, sessionId));
    };
    

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await productService.getProductById(id)
        setProduct(data)
      } catch (error) {
        setError("Error al cargar el producto")
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Cargando...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Producto no encontrado
      </div>
    )
  }

  // Función para convertir URL de imgur a URL directa de imagen
  const getImageUrl = (imgurUrl) => {
    if (!imgurUrl) return ""
    const imageId = imgurUrl.split("/").pop()
    return `https://i.imgur.com/${imageId}.jpg`
  }

  const handleThumbnailClick = (index) => {
    setSelectedImage(index)
  }

  return (
      <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Columna izquierda - Imágenes */}
        <div className="md:w-2/3">
          <div className="mb-4">
            <img
              src={getImageUrl(
                product.productImages?.[selectedImage]?.imageUrl
              )}
              alt={product.name}
              className="w-full h-auto max-h-[600px] object-contain rounded-lg bg-gray-50"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.productImages?.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`flex-shrink-0 border-2 ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-transparent"
                } hover:border-blue-300 rounded-lg transition-all duration-200`}
              >
                <img
                  src={getImageUrl(image.imageUrl)}
                  alt={`${product.name} - ${index + 1}`}
                  className="w-20 h-20 object-contain rounded-lg bg-gray-50"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Columna derecha - Información del producto */}
        <div className="md:w-1/3">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">
              ${product.price}
            </span>
            <span className="text-green-500 text-sm ml-4">
              {product.productVariants?.reduce(
                (total, variant) => total + variant.stock,
                0
              )}{" "}
              uds.
            </span>
          </div>

          {/* Selector de tallas */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Talla:</h3>
            <div className="flex gap-2">
              {[
                ...new Set(product.productVariants?.map((v) => v.size.name)),
              ].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className="w-10 h-10 border rounded-lg flex items-center justify-center hover:border-blue-500 focus:border-blue-500 focus:outline-none"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Selector de colores */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">Color:</h3>
            <div className="flex gap-2">
              {[
                ...new Set(product.productVariants?.map((v) => v.color.name)),
              ].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className="w-8 h-8 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  style={{backgroundColor: color.toLowerCase()}}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Detalles adicionales */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Marca:</span>
                <p>{product.brand?.name}</p>
              </div>
              <div>
                <span className="font-medium">Categorías:</span>
                <p>{product.categories?.map((cat) => cat.name).join(", ")}</p>
              </div>
              <div>
                <span className="font-medium">Origen:</span>
                <p>{product.country?.name}</p>
              </div>
            </div>
          </div>

          {/* Botón de añadir al carrito */}
                  <button type="button" onClick={ handleAddProduct } className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
            <ShoppingCartIcon className="w-5 h-5" />
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
