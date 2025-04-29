import React, {useState} from "react"

import {FaAngleLeft, FaAngleRight} from "react-icons/fa"

const CarruselImg = () => {
  const images = [
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=400&h=300&fit=crop",
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 2 ? prevIndex + 1 : prevIndex
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex))
  }

  return (
    <div>
      <div
        style={{backgroundColor: "#FFAE35"}}
        className="max-w-7xl w-full rounded-lg my-10 py-5 px-2 mx-auto"
      >
        <div className="flex items-center">
          <button onClick={prevSlide} className="p-2  mr-2 cursor-pointer">
            <FaAngleLeft />
          </button>

          {/* Carrusel de imágenes */}
          <div className="overflow-hidden flex-1">
            <div
              className="flex transition-transform duration-500 gap-7"
              style={{transform: `translateX(-${currentIndex * 33.3333}%)`}}
            >
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Banner ${idx + 1}`}
                  className="w-1/3 flex-shrink-0 rounded-lg border-2 border-black object-cover cursor-pointer"
                />
              ))}
            </div>
          </div>

          {/* Botón Derecho */}
          <button onClick={nextSlide} className="p-2 ml-2 cursor-pointer">
            <FaAngleRight />
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center space-x-2 mt-10">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentIndex ? "bg-white" : "bg-gray-200"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CarruselImg
