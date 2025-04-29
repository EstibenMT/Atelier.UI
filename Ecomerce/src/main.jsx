import {StrictMode} from "react"
import {createRoot} from "react-dom/client"
import "./index.css"
import {RouterProvider} from "react-router-dom"
import router from "./router"
import { Provider } from "react-redux";
import Store  from "./data/Store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <Provider store={Store}>
            <RouterProvider router={router} />
        </Provider>
  </StrictMode>
)
