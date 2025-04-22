import React from "react"

const Sidebar = () => {
  return (
    <aside className="w-full sm:w-1/4 lg:w-1/5 p-4 border-r border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Filtrado por</h2>

      <div className="mb-6">
        <h3 className="font-medium text-gray-700 mb-2">Productos</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>
            <input type="checkbox" /> Camisas (354)
          </li>
          <li>
            <input type="checkbox" /> Pantalones (1.239)
          </li>
          <li>
            <input type="checkbox" /> Busos (5.400)
          </li>
          <li>
            <input type="checkbox" /> Sudaderas (800)
          </li>
          <li>
            <input type="checkbox" /> Ropa interior (0)
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Ver todo
            </a>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-medium text-gray-700 mb-2">Comercializador</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>
            <input type="checkbox" /> Alona (354)
          </li>
          <li>
            <input type="checkbox" /> Raque (1.239)
          </li>
          <li>
            <input type="checkbox" /> Americano (5.400)
          </li>
          <li>
            <input type="checkbox" /> Adidas (800)
          </li>
          <li>
            <input type="checkbox" /> Nike (0)
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Ver todo
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
