import Order from '../../models/order'
import { createDocument } from '../../firebase/functions/FirestoreFunctions'
import { orderCollection } from '../../firebase/functions/FirebaseFunctions'

export const SET_ORDERS = 'SET_ORDERS'
export const CREATE_ORDER = 'CREATE_ORDER'
export const UPDATE_ORDER = 'UPDATE_ORDER'
export const FINISH_ORDER = 'FINISH_ORDER'

export const setOrders = (orders) => {
  const loadedOrders = orders.map(order => {
    return new Order(
      order.id,
      order.products,
      order.clientData,
      order.state
    )
  })

  return {
    type: SET_ORDERS,
    orders: loadedOrders
  }
}

export const createOrder = (cart, name, phone, express, direction, notes) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId

    const cartData = cart.map(item => ({
      id: item.id,
      img: item.img,
      price: item.price,
      quantity: item.quantity,
      title: item.title
    }))

    const newOrder = {
      products: cartData,
      clientData: { name, phone, direction, express, notes, userId },
      state: 1
    }

    await createDocument(orderCollection, newOrder)

    dispatch({ type: CREATE_ORDER })
  }
}

export const updateOrderState = (updatedOrder) => {
  return {
    type: UPDATE_ORDER,
    updatedOrder: updatedOrder
  }
}

export const finishOrder = () => {
  return {
    type: FINISH_ORDER
  }
}
