import React from "react"
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/outline"
import CarruselImg from "../components/CarruselImg"
import AccesosRapidos from "../components/AccesosRapidos"
import PruductCard from "../components/PruductCard"
import {products} from "../data/index"
const Home = () => {
  return (
    <div className="w-full p-2 bg-gray-100">
      <CarruselImg />
      <AccesosRapidos />

      <h2 className="text-lg font-semibold mt-6 max-w-7xl w-full space-x-8 mx-auto">
        Productos que te pueden interesar
      </h2>
      <div className="max-w-7xl w-full bg-white p-4 mt-4 rounded-lg flex justify-center space-x-8 mx-auto">
        <button className="p-2">
          <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
        </button>

        <div className="flex flex-wrap gap-6 justify-center p-8">
          {products.map((product, index) => (
            <PruductCard key={index} product={product} />
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
