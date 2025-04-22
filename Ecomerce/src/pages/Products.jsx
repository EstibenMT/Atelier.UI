import React from "react"
import Sidebar from "../components/Sidebar"
import ProductCard from "../components/PruductCard"
import {products} from "../data"

const Products = () => {
  return (
    <div className="flex flex-col sm:flex-row p-4">
      {/* Sidebar */}
      <Sidebar />

      {/* Productos */}
      <main className="flex-1 p-4">
        <p className="text-gray-600 text-sm mb-4">
          {products.length} resultados en total
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Products
