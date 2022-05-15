import { userReducer } from './slices/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { orderReducer } from './slices/orderSlice'
import { productReducer } from './slices/productSlide'

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    product: productReducer
  }
})

export default store
