import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa"
import {CiMail} from "react-icons/ci"
import {IoMdTime} from "react-icons/io"
import {LuPhone} from "react-icons/lu"
import {GiPositionMarker} from "react-icons/gi"

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between">
        {/* Sección Izquierda */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Conócenos</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#">Acerca de Alona</a>
            </li>
            <li>
              <a href="#">Centro de Ayuda y Soporte</a>
            </li>
          </ul>
          <h3 className="text-lg font-semibold mt-5 mb-3">Información Legal</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#">Términos y condiciones</a>
            </li>
            <li>
              <a href="#">Política de privacidad</a>
            </li>
          </ul>
        </div>

        {/* Sección Derecha */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contáctanos</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex gap-2 items-center ">
              <LuPhone className=" text-white" /> Línea de WhatsApp: xxx xxx xxx
            </li>
            <li className="flex gap-2 items-center ">
              <IoMdTime className=" text-white " /> Horarios: Lun - Vie de 8:00
              am - 7:00 pm
            </li>
            <li className="flex gap-2 items-center">
              <CiMail className=" text-white" /> contacto@Correo.com
            </li>
            <li className="flex gap-2 items-center">
              <GiPositionMarker className="text-white" /> Calle 22B #00A - 56,
              Medellín, Colombia.
            </li>
          </ul>
          <h3 className="text-lg font-semibold mt-5 mb-3">Seamos sociales</h3>
          <white className="flex space-x-4">
            <FaFacebookF className="cursor-pointer text-white hover:text-amber-100" />
            <FaTwitter className="cursor-pointer text-white hover:text-white" />
            <FaInstagram className="cursor-pointer text-white hover:text-white" />
            <FaYoutube className="cursor-pointer text-white hover:text-white" />
            <FaLinkedinIn className="cursor-pointer text-white hover:text-white" />
          </white>
        </div>

        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/Ecomerce/src/assets/og-image.png"
            alt="Place to Pay"
            className="h-12"
          />
        </div>
      </div>

      {/* Línea inferior */}
      <div className="border-t border-gray-700 mt-6"></div>
    </footer>
  )
}

export default Footer
