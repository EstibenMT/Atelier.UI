import React, {useState, useEffect} from "react"
import Sidebar from "../components/Sidebar"
import ProductCard from "../components/PruductCard"
import {productService} from "../services/productService"

const Products = () => {
  const [products, setProducts] = useState([])
  const [filters, setFilters] = useState({
    brandIds: [],
    categoryIds: [],
    productName: "",
    minPrice: null,
    maxPrice: null,
    sortBy: null,
  })

  const fetchProducts = async () => {
    try {
      const data = await productService.getFilteredProducts(filters)
      setProducts(data)
    } catch (error) {
      console.error("Error al obtener productos:", error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }))
  }

  return (
    <div className="flex flex-col sm:flex-row p-4">
      {/* Sidebar */}
      <Sidebar onFilterChange={handleFilterChange} />

      {/* Productos */}
      <main className="flex-1 p-4 ml-24">
        <p className="text-gray-600 text-sm mb-4">
          {products.length} resultados en total
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Products
