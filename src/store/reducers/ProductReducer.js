import CartItem from '../../models/cartItem'

import { CREATE_PRODUCT, SET_PRODUTS, ADD_CART, UPDATE_CART, DELETE_CART, EDIT_CART, RESET_CART, FILTER_PRODUCTS, DELETE_PRODUCT } from '../actions/ProductActions'

const initialState = {
  filteredProducts: [],
  totalPrice: 0,
  products: [],
  cart: []
}

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_CART:
      return {
        ...state,
        totalPrice: 0,
        cart: []
      }
    case ADD_CART:
      return {
        ...state,
        totalPrice: state.totalPrice + parseInt(action.product.price) * parseInt(action.product.quantity),
        cart: [new CartItem(
          action.product.id,
          action.product.title,
          action.product.quantity,
          action.product.price,
          action.product.img
        ), ...state.cart]
      }
    case EDIT_CART: {
      let priceEdit = 0
      const editedCart = state.cart.map(product => {
        if (product.id === action.product.id) {
          return new CartItem(
            product.id,
            product.title,
            action.product.quantity,
            product.price,
            product.img
          )
        } else {
          return product
        }
      })
      editedCart.forEach(product => {
        priceEdit = priceEdit + parseInt(product.price) * parseInt(product.quantity)
      })
      return {
        ...state,
        totalPrice: priceEdit,
        cart: editedCart
      }
    }
    case UPDATE_CART: {
      let priceUpdate = 0
      const updatedCart = state.cart.map(product => {
        if (product.id === action.product.id) {
          return new CartItem(
            product.id,
            product.title,
            product.quantity + action.product.quantity,
            product.price,
            product.img
          )
        } else {
          return product
        }
      })
      updatedCart.forEach(product => {
        priceUpdate = priceUpdate + parseInt(product.price) * parseInt(product.quantity)
      })
      return {
        ...state,
        totalPrice: priceUpdate,
        cart: updatedCart
      }
    }
    case DELETE_CART: {
      const filteredCart = state.cart.filter(product => product.id !== action.product.id)
      const price = filteredCart.reduce((acc, product) => {
        return acc + parseInt(product.price) * parseInt(product.quantity)
      }, 0)
      return {
        ...state,
        totalPrice: price,
        cart: filteredCart
      }
    }
    case SET_PRODUTS:
      return {
        ...state,
        filteredProducts: action.products,
        products: action.products
      }
    case FILTER_PRODUCTS:
      return {
        ...state,
        filteredProducts: action.filteredProducts
      }
    case CREATE_PRODUCT:
      return {
        ...state,
        filteredProducts: [action.productAdded, ...state.products],
        products: [action.productAdded, ...state.products]
      }
    case DELETE_PRODUCT: {
      const filterProducts = state.products.filter(product => product.id !== action.id)
      return {
        ...state,
        products: filterProducts,
        filteredProducts: filterProducts
      }
    }
  }
  return state
}

export default ProductReducer
