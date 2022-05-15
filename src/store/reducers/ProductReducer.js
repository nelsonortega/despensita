import { UPDATE_CART, CREATE_PRODUCT, SET_PRODUTS, DELETE_CART, RESET_CART, FILTER_PRODUCTS, DELETE_PRODUCT } from '../actions/ProductActions'

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
    case UPDATE_CART: {
      const isProductAlreadyAdded = state.cart.some(product => product.id === action.product.id)
      const updatedCart = isProductAlreadyAdded
        ? state.cart.map(product => {
          if (product.id === action.product.id) {
            return {
              ...product,
              quantity: action.edit ? action.product.quantity : product.quantity + action.product.quantity
            }
          }

          return product
        })
        : [action.product, ...state.cart]

      return {
        ...state,
        totalPrice: updatedCart.reduce((acc, product) => acc + parseInt(product.price) * parseInt(product.quantity), 0),
        cart: updatedCart
      }
    }
    case DELETE_CART: {
      const updatedCart = state.cart.filter(product => product.id !== action.product.id)

      return {
        ...state,
        totalPrice: updatedCart.reduce((acc, product) => acc + parseInt(product.price) * parseInt(product.quantity), 0),
        cart: updatedCart
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
