import React, { useEffect, useState } from "react"
import { CiLocationOn } from "react-icons/ci";
import { getCountry, getState, getCity, getStreetType } from "../services/AddressService";
 
const AddressForm = ({ onSaveAddress, onEditAddress }) => {
    const [mode, setMode] = useState("form")
    const [departamentos, setDepartamentos] = useState([]);
    const [address, setAddress] = useState({
        email: "",
        document: "",
        countryId: 0,
        pais: "",
        departamento: "",
        ciudad: "",
        tipoVia: "",
        nombreSufijo: "",
        numero1: "",
        numero2: "",
        referencia: ""
    });
    useEffect(() => {
        const loadDepartamentos = async () => {
            const data = await getState()(); // Por ejemplo, si 1 es el countryId de Colombia
            if (data) {
                setDepartamentos(data);
            }
        };

        loadDepartamentos();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (onSaveAddress) {
            onSaveAddress(address); 
        }
        setMode("summary");
    };

    const handleEdit = () => {
        setMode("form");
        onEditAddress()
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md space-y-4">
            { mode === "form" ? (
                <form className="space-y-4" onSubmit={handleSave}>
                    <h2 className="text-xl font-semibold">Información de entrega</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={address.email}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium">País</label>
                            <input
                                type="text"
                                name="pais"
                                value={address.pais}
                                onChange={handleChange}
                                placeholder = ""
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Departamento</label>
                            <select
                                name="departamento"
                                value={address.departamento}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Seleccionar</option>
                                {departamentos.map((dep) => (
                                    <option key={dep.stateId} value={dep.name}>
                                        {dep.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Ciudad</label>
                            <select
                                name="ciudad"
                                value={address.ciudad}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Seleccionar</option>
                                {departamentos.map((dep) =>(
                                    <option key={dep.stateId} value={dep.stateId}>
                                        {dep.name }
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
                                value={address.tipoVia}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                            >
                                <option value="">Seleccionar</option>
                                <option value="Calle">Calle</option>
                                <option value="Carrera">Carrera</option>
                                <option value="Avenida">Avenida</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Nombre y sufijo</label>
                            <input
                                type="text"
                                name="nombreSufijo"
                                value={address.nombreSufijo}
                                onChange={handleChange}
                                placeholder="Ej: 37B Sur"
                                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
                        <label className="block text-sm font-medium">Punto de referencia (opcional)</label>
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
                    <h2 className="text-xl font-semibold text-gray-800">Información de entrega</h2>
                    <p className="text-gray-600">Tu compra se entregará en la siguiente dirección:</p>

                    <div className="flex items-start bg-gray-50 p-4 rounded-md border">
                        <CiLocationOn className="w-6 h-6 text-blue-600 mt-1 mr-3"/>
                        <div>
                            <p className="text-gray-800 font-medium">
                                    {address.tipoVia} {address.nombreSufijo} #{address.numero1} - {address.numero2}, {address.referencia}
                            </p>
                            <p className="text-gray-600">
                                {address.ciudad}, {address.departamento}, {address.pais}
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
