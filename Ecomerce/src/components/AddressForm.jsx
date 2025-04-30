import React, { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci";
import { getCountries, getStates, getCities, getStreetTypes } from "../services/LocationService";
 
const AddressForm = ({ onSaveAddress, onEditAddress }) => {
    const [mode, setMode] = useState("form")
    const [email, setEmail] = useState("");
    const [document, setDocument] = useState("");
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [streetTypes, setStreetTypes] = useState([]);
    const [address, setAddress] = useState({
        "addressId" : 0,
        "complement": "",
        "postalCode": "",
        "description": "",
        "number": "",
        "streetType": {
            "streetTypeId": 0,
            "name": ""
        },
        "city": {
            "cityId": 0,
            "name": ""
        },
        "country": {
            "countryId": 0,
            "name": ""
        },
        "state": {
            "stateId": 0,
            "name": ""
        }
    });

    useEffect(() => {
        const loadCountries = async () => {
            const data = await getCountries();
            if (data) {
                setCountries(data);
            }
        };
        const loadStreetTypes = async () => {
            const data = await getStreetTypes();
            if (data) {
                setStreetTypes(data);
            }
        };
        loadCountries();
        loadStreetTypes();
    }, []);

    const handleChangeCountry = async (e) => {
        const countryId = e.target.value;
        const selectedCountry = countries.find(c => c.countryId === parseInt(countryId));
        setAddress(prev => ({
            ...prev,
            country: selectedCountry,
            state: null,
            city: null,
        }));

        const statesData = await getStates(countryId);
        setStates(statesData);
        setCities([]);
    };

    const handleChangeState = async (e) => {
        const stateId = e.target.value;
        const selectedState = states.find(s => s.stateId === parseInt(stateId));
        setAddress(prev => ({
            ...prev,
            state: selectedState,
            city: null,
        }));

        const citiesData = await getCities(stateId);
        setCities(citiesData);
    };

    const handleChangeCity = (e) => {
        const cityId = e.target.value;
        const selectedCity = cities.find(c => c.cityId === parseInt(cityId));
        setAddress(prev => ({
            ...prev,
            city: selectedCity,
        }));
    };

    const handleChangeStreetType = (e) => {
        const streetTypeId = e.target.value;
        const selectedStreetType = streetTypes.find(s => s.streetTypeIdId === parseInt(streetTypeId));
        setAddress(prev => ({
            ...prev,
            streetType: selectedStreetType,
        }));
    };

    const handleChangeAddress = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (onSaveAddress) {
            onSaveAddress(address,email,document); 
        }
        setMode("summary");
    };

  const handleEdit = () => {
    setMode("form")
    onEditAddress()
  }

    return (
        <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
            { mode === "form" ? (
                <form className="space-y-4" onSubmit={handleSave}>
                    <h2 className="text-xl font-semibold">Información de entrega</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" >
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Documento</label>
                            <input
                                type="text"
                                name="document"
                                value={document}
                                onChange={(e) => setDocument(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Codigo postal</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={address.postalCode}
                                onChange={handleChangeAddress}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium">País</label>
                            <select
                                type="text"
                                name="pais"
                                value={address.country?.countryId}
                                onChange={handleChangeCountry}
                                placeholder = ""
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                                name="departamento"
                                value={address.state?.stateId}
                                onChange={handleChangeState}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                                name="ciudad"
                                value={address.city?.cityId}
                                onChange={handleChangeCity}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Seleccionar</option>
                                {cities.map((city) =>(
                                    <option key={city.cityId} value={city.cityId}>
                                        {city.name }
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Tipo de vía</label>
                            <select
                                name="tipoVia"
                                value={address.streetType?.streetTypeId}
                                onChange={handleChangeStreetType}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                            <label className="block text-sm font-medium">Nombre y sufijo</label>
                            <input
                                type="text"
                                name="description"
                                value={address.description}
                                onChange={handleChangeAddress}
                                placeholder="Ej: 37B Sur"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div className="flex space-x-2">
                            <div>
                                <label className="block text-sm font-medium">Numero</label>
                                <input
                                    type="text"
                                    name="number"
                                    value={address.number}
                                    onChange={handleChangeAddress}
                                    placeholder="#"
                                    className="mt-1 block w-1/2 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Complemento</label>
                                <input
                                    type="text"
                                    name="complement"
                                    value={address.complement}
                                    onChange={handleChangeAddress}
                                    placeholder=""
                                    className="mt-1 block w-1/2 border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Punto de referencia (opcional)</label>
                        <input
                            type="text"
                            name="referencia"
                            onChange={handleChangeAddress}
                            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSave }
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                        Guardar dirección
                    </button>
                </form>
            ) : (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800">Información de entrega</h2>
                    <p className="text-gray-600">Tu compra se entregará en la siguiente dirección:</p>

                    <div className="flex items-start bg-gray-50 p-4 rounded-md border">
                        <CiLocationOn className="w-6 h-6 text-blue-600 mt-1 mr-3"/>
                        <div>
                            <p className="text-gray-800 font-medium">
                                    {address.streetType?.name} {address.description} #{address.number} - {address.complement}
                            </p>
                            <p className="text-gray-600">
                                    {address.city?.name}, {address.state?.name}, {address.country?.name}
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
       </div >
    );
}

export default AddressForm
