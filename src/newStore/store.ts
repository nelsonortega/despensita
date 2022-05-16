import { userReducer } from './slices/userSlice'
import { configureStore } from '@reduxjs/toolkit'
import { orderReducer } from './slices/orderSlice'
import { productReducer } from './slices/productSlide'

export const store = configureStore({
  reducer: {
    user: userReducer,
    orders: orderReducer,
    products: productReducer
  }
})

export type IStoreState = ReturnType<typeof store.getState>
