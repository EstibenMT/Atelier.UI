import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout/Layout"
import Userinfo from "./pages/Userinfo"
import Products from "./pages/Products"
import ShoppingCart from "./pages/ShoppingCart"

const router = createBrowserRouter([
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
        path: "/Ecomerce/ShoppingCart",
        element: <ShoppingCart />,
        },
    ],
  },
])

export default router
