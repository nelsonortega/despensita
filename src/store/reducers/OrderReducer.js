import OrderItem from '../../models/order'
import { CREATE_ORDER, FINISH_ORDER, SET_ORDERS, UPDATE_ORDER } from '../actions/OrderActions'

const initialState = {
  orders: [],
  orderCreated: false
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
        orderCreated: true
      }
    case UPDATE_ORDER: {
      const updatedOrders = state.orders.map(order => {
        if (order.id === action.updatedOrder.id) {
          return new OrderItem(
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
    case FINISH_ORDER:
      return {
        ...state,
        orderCreated: false
      }
  }
  return state
}

export default OrderReducer
