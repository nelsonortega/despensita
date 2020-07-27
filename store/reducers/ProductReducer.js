import Product from '../../models/product'
import CartItem from '../../models/cartItem'

import { CREATE_PRODUCT, SET_PRODUTS, ADD_CART, UPDATE_CART, DELETE_CART, EDIT_CART, RESET_CART, FILTER_PRODUCTS } from '../actions/ProductActions'

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
      const newProduct = new Product(
        action.productData.response,
        action.productData.title,
        action.productData.description,
        action.productData.category,
        action.productData.price,
        action.productData.img
      )
      return {
        ...state,
        filteredProducts: [newProduct].concat(state.products),
        products: [newProduct].concat(state.products)
      }
    case ADD_CART:
      const newItem = new CartItem(
        action.product.id,
        action.product.title,
        action.product.quantity,
        action.product.price,
        action.product.img
      )
      return {
        ...state,
        totalPrice: state.totalPrice + parseInt(action.product.price) * parseInt(action.product.quantity),
        cart: [newItem].concat(state.cart)
      }
    case DELETE_CART:
      let price = 0
      let filteredCart = state.cart.filter(product => product.id !== action.product.id)
      filteredCart.map(product => {
        price = price + parseInt(product.price) * parseInt(product.quantity)
      })
      return {
        ...state,
        totalPrice: price,
        cart: filteredCart
      }
    case EDIT_CART:
      let priceEdit = 0
      let editedCart = state.cart.map(product => {
        if (product.id === action.product.id) {
          return new CartItem(
            product.id,
            product.title,
            action.product.quantity,
            product.price,
            product.img
          )
        }
        else {
          return product
        }
      })
      editedCart.map(product => {
        priceEdit = priceEdit + parseInt(product.price) * parseInt(product.quantity)
      })
      return {
        ...state,
        totalPrice: priceEdit,
        cart: editedCart
      }
    case UPDATE_CART:
      let priceUpdate = 0
      let updatedCart = state.cart.map(product => {
        if (product.id === action.product.id) {
          return new CartItem(
            product.id,
            product.title,
            product.quantity + action.product.quantity,
            product.price,
            product.img
          )
        }
        else {
          return product
        }
      })
      updatedCart.map(product => {
        priceUpdate = priceUpdate + parseInt(product.price) * parseInt(product.quantity)
      })
      return {
        ...state,
        totalPrice: priceUpdate,
        cart: updatedCart
      }
  }
  return state
}

export default ProductReducer