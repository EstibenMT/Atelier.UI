import React, {useState, useEffect} from "react"
import {categoryService} from "../services/categoryService"
import {productService} from "../services/productService"

const Sidebar = ({onFilterChange}) => {
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingBrands, setIsLoadingBrands] = useState(true)
  const [error, setError] = useState(null)
  const [brandError, setBrandError] = useState(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await categoryService.getAll()
        console.log("Categorías cargadas:", data)
        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          console.error("Los datos recibidos no son un array:", data)
          setCategories([])
        }
      } catch (error) {
        console.error("Error al cargar las categorías:", error)
        setError("Error al cargar las categorías")
        setCategories([])
      } finally {
        setIsLoading(false)
      }
    }

    loadCategories()
  }, [])

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setIsLoadingBrands(true)
        setBrandError(null)
        const data = await productService.getAllBrands()
        console.log("Marcas cargadas:", data)
        if (Array.isArray(data)) {
          setBrands(data)
        } else {
          console.error("Los datos recibidos no son un array:", data)
          setBrands([])
        }
      } catch (error) {
        console.error("Error al cargar las marcas:", error)
        setBrandError("Error al cargar las marcas")
        setBrands([])
      } finally {
        setIsLoadingBrands(false)
      }
    }

    loadBrands()
  }, [])

  useEffect(() => {
    const filters = {
      brandIds: selectedBrands,
      categoryIds: selectedCategories,
      productName: "",
      minPrice: minPrice ? Number(minPrice) : null,
      maxPrice: maxPrice ? Number(maxPrice) : null,
      sortBy: null,
    }
    onFilterChange(filters)
  }, [selectedCategories, selectedBrands, minPrice, maxPrice])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const handleBrandChange = (brandId) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brandId)) {
        return prev.filter((id) => id !== brandId)
      } else {
        return [...prev, brandId]
      }
    })
  }

  const renderCategories = () => {
    if (!Array.isArray(categories)) {
      return (
        <li className="text-gray-500">Error en el formato de las categorías</li>
      )
    }

    if (categories.length === 0) {
      return <li className="text-gray-500">No hay categorías disponibles</li>
    }

    return categories.map((category) => (
      <li key={category.categoryId}>
        <input
          type="checkbox"
          checked={selectedCategories.includes(category.categoryId)}
          onChange={() => handleCategoryChange(category.categoryId)}
        />{" "}
        {category.name} ({category.productCount})
      </li>
    ))
  }

  const renderBrands = () => {
    if (!Array.isArray(brands)) {
      return (
        <li className="text-gray-500">Error en el formato de las marcas</li>
      )
    }

    if (brands.length === 0) {
      return <li className="text-gray-500">No hay marcas disponibles</li>
    }

    return brands.map((brand) => (
      <li key={brand.brandId}>
        <input
          type="checkbox"
          checked={selectedBrands.includes(brand.brandId)}
          onChange={() => handleBrandChange(brand.brandId)}
        />{" "}
        {brand.name} ({brand.productCount})
      </li>
    ))
  }

  return (
    <aside className="w-full sm:w-1/4 lg:w-1/5 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filtrado por</h2>

      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Precio</h3>
        <div className="space-y-2">
          <div>
            <label className="text-sm text-gray-600">Precio mínimo</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="0"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Precio máximo</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-full p-2 border rounded mt-1"
              placeholder="1000"
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Categorías</h3>
        {isLoading ? (
          <p className="text-sm text-gray-600">Cargando categorías...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <ul className="space-y-1 text-sm text-gray-600">
            {renderCategories()}
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Ver todo
              </a>
            </li>
          </ul>
        )}
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-2">Comercializador</h3>
        {isLoadingBrands ? (
          <p className="text-sm text-gray-600">Cargando marcas...</p>
        ) : brandError ? (
          <p className="text-sm text-red-600">{brandError}</p>
        ) : (
          <ul className="space-y-1 text-sm text-gray-600">
            {renderBrands()}
            <li>
              <a href="#" className="text-blue-600 hover:underline">
                Ver todo
              </a>
            </li>
          </ul>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
