import { IOrder } from '../../interfaces/IOrder'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IOrderInitialState {
  orders: IOrder[]
}

const initialState: IOrderInitialState = {
  orders: []
}

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload
    },
    createOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload)
    },
    updateOrderState: (state, action: PayloadAction<IOrder>) => {
      const updatedOrders = state.orders.map(order => {
        if (order.id === action.payload.id) {
          return action.payload
        } else {
          return order
        }
      })

      state.orders = updatedOrders
    }
  }
})

export const {
  setOrders,
  createOrder,
  updateOrderState
} = orderSlice.actions

export const orderReducer = orderSlice.reducer
