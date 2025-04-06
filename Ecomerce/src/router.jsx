import {createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./Layout/Layout"
import Userinfo from "./pages/Userinfo"

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
    ],
  },
])

export default router
