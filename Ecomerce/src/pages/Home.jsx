import React, {useState, useEffect} from "react"
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline"
import CarruselImg from "../components/CarruselImg"
import AccesosRapidos from "../components/AccesosRapidos"
import ProductCard from "../components/PruductCard"
import {productService} from "../services/productService"

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const productsPerView = 3

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await productService.getAllProducts()
        setProducts(data)
      } catch (error) {
        setError(
          "No se pudieron cargar los productos. Por favor, intenta de nuevo más tarde."
        )
        console.error("Error al obtener los productos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < products.length - productsPerView ? prevIndex + 1 : prevIndex
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  if (loading) {
    return (
      <div className="w-full p-2 bg-gray-100 flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full p-2 bg-gray-100 flex justify-center items-center min-h-[200px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full p-2 bg-gray-100">
      <CarruselImg />
      <AccesosRapidos />

      <h2 className="text-lg font-semibold mt-4 mb-6 max-w-7xl w-full mx-auto">
        Productos que te pueden interesar
      </h2>
      <div className="max-w-7xl w-full justify-items-center bg-white p-4 mb-8 rounded-lg flex items-center mx-auto">
        <button
          className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeftIcon
            className={`w-6 h-6 ${
              currentIndex === 0 ? "text-gray-300" : "text-gray-500"
            }`}
          />
        </button>

        <div className="overflow-hidden flex-1">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / productsPerView)
              }%)`,
              gap: "1rem",
            }}
          >
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-1"
                style={{
                  width: `calc(${100 / productsPerView}% - ${2 / 3}rem)`,
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        <button
          className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
          onClick={nextSlide}
          disabled={currentIndex >= products.length - productsPerView}
        >
          <ChevronRightIcon
            className={`w-6 h-6 ${
              currentIndex >= products.length - productsPerView
                ? "text-gray-300"
                : "text-gray-500"
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default Home
