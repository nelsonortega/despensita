import { IProduct } from '../../interfaces/IProduct'
import { ICartItem } from '../../interfaces/ICartItem'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IEditAction {
  id: string
  quantity: number
}

interface IProductInitialState {
  filteredProducts: IProduct[]
  totalPrice: number
  products: IProduct[]
  cart: ICartItem[]
}

const initialState: IProductInitialState = {
  filteredProducts: [],
  totalPrice: 0,
  products: [],
  cart: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetCart: (state) => {
      state.totalPrice = 0
      state.cart = []
    },
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      let updatedCart: ICartItem[]
      const isProductAlreadyAdded = state.cart.some(cartItem => cartItem.id === action.payload.id)

      if (isProductAlreadyAdded) {
        updatedCart = state.cart.map(cartItem => {
          if (cartItem.id === action.payload.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + action.payload.quantity
            }
          }

          return cartItem
        })
      } else {
        updatedCart = [action.payload, ...state.cart]
      }

      state.totalPrice = updatedCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
      state.cart = updatedCart
    },
    editItemFromCart: (state, action: PayloadAction<IEditAction>) => {
      const updatedCart: ICartItem[] = state.cart.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          return {
            ...cartItem,
            quantity: action.payload.quantity
          }
        }

        return cartItem
      })

      state.totalPrice = updatedCart.reduce((acc, product) => acc + product.price * product.quantity, 0)
      state.cart = updatedCart
    },
    deleteItemFromCart: (state, action) => {},
    setProducts: (state, action) => {},
    createProduct: (state, action) => {},
    deleteProduct: (state, action) => {},
    filterProducts: (state, action) => {}
  }
})

export const {
  resetCart,
  addItemToCart,
  editItemFromCart,
  deleteItemFromCart,
  setProducts,
  createProduct,
  deleteProduct,
  filterProducts
} = productSlice.actions

export const productReducer = productSlice.reducer
