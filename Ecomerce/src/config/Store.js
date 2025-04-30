import {configureStore} from "@reduxjs/toolkit"
import cartReducer from "../data/CartSlice"

const Store = configureStore({
  reducer: {
    cart: cartReducer,
  },
})

export default Store
