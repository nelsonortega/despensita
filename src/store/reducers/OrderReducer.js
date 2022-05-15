import Order from '../../models/order'
import { CREATE_ORDER, SET_ORDERS, UPDATE_ORDER } from '../actions/OrderActions'

const initialState = {
  orders: []
}

const OrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        orders: action.orders
      }
    case CREATE_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.newOrder]
      }
    case UPDATE_ORDER: {
      const updatedOrders = state.orders.map(order => {
        if (order.id === action.updatedOrder.id) {
          return new Order(
            action.updatedOrder.id,
            action.updatedOrder.products,
            action.updatedOrder.clientData,
            action.updatedOrder.state
          )
        } else {
          return order
        }
      })

      return {
        ...state,
        orders: updatedOrders
      }
    }
  }
  return state
}

export default OrderReducer
