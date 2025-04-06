import React, {useState} from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline"
import {CgShoppingBag} from "react-icons/cg"
import {FaAngleLeft, FaAngleRight} from "react-icons/fa"

const Home = () => {
  const images = [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5",
    "https://picsum.photos/400/300?random=6",
    "https://picsum.photos/400/300?random=7",
    "https://picsum.photos/400/300?random=8",
    "https://picsum.photos/400/300?random=9",
    "https://picsum.photos/400/300?random=10",
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    )
  }

  return (
    <div className="w-full p-4 bg-gray-100">
      <div
        style={{backgroundColor: "#FFAE35"}}
        className="max-w-7xl w-full p-4 rounded-lg my-10 py-10 mx-auto"
      >
        <button
          onClick={prevSlide}
          className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2  p-2 rounded-full shadow"
        >
          <FaAngleLeft />
        </button>
        {/* Contenedor del Carrusel */}
        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{transform: `translateX(-${currentIndex * 33.3333}%)`}}
          >
            {images.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Banner ${idx + 1}`}
                className="w-1/3 flex-shrink-0 rounded-lg object-cover"
              />
            ))}
          </div>

          {/* Flechas */}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
        >
          <FaAngleRight />
        </button>
        {/* Indicadores */}
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* 🟡 Sección de Accesos Rápidos */}
      <div className="max-w-7xl w-full bg-white p-4 mt-4 rounded-lg flex justify-center space-x-8 mx-auto">
        <div className="flex flex-col items-center">
          <span
            style={{backgroundColor: "#E4ECFF"}}
            className="rounded-full p-5 flex justify-center items-center"
          >
            <CgShoppingBag className="h-6 w-6 text-blue-500" />
          </span>
          <p className="text-gray-600">Catálogo</p>
        </div>
        <div className="flex flex-col items-center">
          <span
            style={{backgroundColor: "#E4ECFF"}}
            className="rounded-full p-5 flex justify-center items-center"
          >
            <ShoppingCartIcon className="h-6 w-6 text-blue-500" />
          </span>
          <p className="text-gray-600">Carrito</p>
        </div>
      </div>

      {/* 🔵 Sección de Productos */}
      <h2 className="text-lg font-semibold mt-6 max-w-7xl w-full space-x-8 mx-auto">
        Productos que te pueden interesar
      </h2>
      <div className="max-w-7xl w-full bg-white p-4 mt-4 rounded-lg flex justify-center space-x-8 mx-auto">
        <button className="p-2">
          <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
        </button>

        <div className="flex overflow-x-auto space-x-4 p-4">
          {/* Tarjeta Producto */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="border p-2 rounded-lg w-40 shadow-md">
              <span className="bg-blue-500 text-white text-xs px-2 rounded-full">
                NUEVO
              </span>
              <img
                src="/camisa.jpg"
                alt="Camisa"
                className="w-full h-32 object-cover rounded-md"
              />
              <p className="text-sm font-semibold">ALONA</p>
              <p className="text-gray-500 text-xs">CAMISA</p>
            </div>
          ))}
        </div>

        <button className="p-2">
          <ChevronRightIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </div>
  )
}

export default Home
