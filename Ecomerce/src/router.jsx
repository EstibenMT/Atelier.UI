import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout/Layout"
import Userinfo from "./pages/Userinfo"
import Products from "./pages/Products"
import PagoExitoso from "./pages/PagoExitoso"
import ProductDetail from "./pages/ProductDetail"
import ShoppingCart from "./pages/ShoppingCart"
import Login from './pages/Login';
import Register from './pages/Register';

const router = createBrowserRouter([

    // Rutas de autenticación (sin Layout)
    {
        path: "/Ecomerce/Login",
        element: <Login />,
    },
    {
        path: "/Ecomerce/Register",
        element: <Register />,
    },

  {
    path: "/", //Home principal,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Ecomerce/user",
        element: <Userinfo />,
      },
      {
        path: "/Ecomerce/products",
        element: <Products />,
      },
      {
        path: "/Ecomerce/Pagos",
        element: <PagoExitoso />,
      },
      {
        path: "/Ecomerce/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/Ecomerce/ShoppingCart",
        element: <ShoppingCart />,
        },
        {
        path: "/Ecomerce/Register",
        element: <Register />,
        },
        {
        path: "/Ecomerce/Login",
        element: <Login />,
        },
    ],
  },
])

export default router
