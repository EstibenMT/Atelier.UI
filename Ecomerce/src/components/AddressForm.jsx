import React, {useState, useEffect} from "react"
import {CiLocationOn} from "react-icons/ci"
import {
  getCountries,
  getStates,
  getCities,
  getStreetTypes,
} from "../services/LocationService"

const AddressForm = ({onSaveAddress, onEditAddress}) => {
  const [mode, setMode] = useState("form")
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [streetTypes, setStreetTypes] = useState([])
  const [address, setAddress] = useState({
    email: "",
    document: "",
    countryId: "",
    stateId: "",
    cityId: "",
    streetTypeId: "",
    nombreSufijo: "",
    numero1: "",
    numero2: "",
    referencia: "",
  })

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [countriesData, streetTypesData] = await Promise.all([
          getCountries(),
          getStreetTypes(),
        ])
        setCountries(countriesData)
        setStreetTypes(streetTypesData)
      } catch (error) {
        console.error("Error al cargar datos iniciales:", error)
      }
    }

    loadInitialData()
  }, [])

  useEffect(() => {
    const loadStates = async () => {
      if (address.countryId) {
        try {
          const statesData = await getStates(address.countryId)
          setStates(statesData)
        } catch (error) {
          console.error("Error al cargar estados:", error)
        }
      }
    }

    loadStates()
  }, [address.countryId])

  useEffect(() => {
    const loadCities = async () => {
      if (address.stateId) {
        try {
          const citiesData = await getCities(address.stateId)
          setCities(citiesData)
        } catch (error) {
          console.error("Error al cargar ciudades:", error)
        }
      }
    }

    loadCities()
  }, [address.stateId])

  const handleChange = (e) => {
    const {name, value} = e.target
    setAddress((prev) => ({
      ...prev,
      [name]: value,
      // Resetear estados y ciudades cuando cambia el país
      ...(name === "countryId" && {stateId: "", cityId: ""}),
      // Resetear ciudades cuando cambia el estado
      ...(name === "stateId" && {cityId: ""}),
    }))
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (onSaveAddress) {
      onSaveAddress(address)
    }
    setMode("summary")
  }

  const handleEdit = () => {
    setMode("form")
    onEditAddress()
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
      {mode === "form" ? (
        <form className="space-y-4" onSubmit={handleSave}>
          <h2 className="text-xl font-semibold">Información de entrega</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={address.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Documento</label>
              <input
                type="text"
                name="document"
                value={address.document}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">País</label>
              <select
                name="countryId"
                value={address.countryId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Seleccionar</option>
                {countries.map((country) => (
                  <option key={country.countryId} value={country.countryId}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Departamento</label>
              <select
                name="stateId"
                value={address.stateId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
                disabled={!address.countryId}
              >
                <option value="">Seleccionar</option>
                {states.map((state) => (
                  <option key={state.stateId} value={state.stateId}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Ciudad</label>
              <select
                name="cityId"
                value={address.cityId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
                disabled={!address.stateId}
              >
                <option value="">Seleccionar</option>
                {cities.map((city) => (
                  <option key={city.cityId} value={city.cityId}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium">Tipo de vía</label>
              <select
                name="streetTypeId"
                value={address.streetTypeId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="">Seleccionar</option>
                {streetTypes.map((type) => (
                  <option key={type.streetTypeId} value={type.streetTypeId}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Nombre y sufijo
              </label>
              <input
                type="text"
                name="nombreSufijo"
                value={address.nombreSufijo}
                onChange={handleChange}
                placeholder="Ej: 37B Sur"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                name="numero1"
                value={address.numero1}
                onChange={handleChange}
                placeholder="#"
                className="mt-1 block w-1/2 border border-gray-300 rounded-md p-2"
                required
              />
              <input
                type="text"
                name="numero2"
                value={address.numero2}
                onChange={handleChange}
                placeholder=""
                className="mt-1 block w-1/2 border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">
              Punto de referencia (opcional)
            </label>
            <input
              type="text"
              name="referencia"
              value={address.referencia}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Guardar dirección
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Información de entrega
          </h2>
          <p className="text-gray-600">
            Tu compra se entregará en la siguiente dirección:
          </p>

          <div className="flex items-start bg-gray-50 p-4 rounded-md border">
            <CiLocationOn className="w-6 h-6 text-blue-600 mt-1 mr-3" />
            <div>
              <p className="text-gray-800 font-medium">
                {
                  streetTypes.find(
                    (t) => t.streetTypeId === address.streetTypeId
                  )?.name
                }{" "}
                {address.nombreSufijo} #{address.numero1} - {address.numero2},{" "}
                {address.referencia}
              </p>
              <p className="text-gray-600">
                {cities.find((c) => c.cityId === address.cityId)?.name},{" "}
                {states.find((s) => s.stateId === address.stateId)?.name},{" "}
                {countries.find((c) => c.countryId === address.countryId)?.name}
              </p>
            </div>
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={handleEdit}
              className="text-blue-400 hover:text-blue-800 font-medium text-sm"
            >
              Editar o cambiar dirección
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddressForm
