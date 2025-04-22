import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout/Layout"
import Userinfo from "./pages/Userinfo"
import Products from "./pages/Products"

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
    ],
  },
])

export default router
