import React, {useState} from "react"

import {FaAngleLeft, FaAngleRight} from "react-icons/fa"

const CarruselImg = () => {
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
    "https://picsum.photos/400/300?random=11",
    "https://picsum.photos/400/300?random=12",
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
