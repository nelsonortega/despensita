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
  name: 'products',
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

      state.totalPrice = updatedCart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)
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

      state.totalPrice = updatedCart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)
      state.cart = updatedCart
    },
    deleteItemFromCart: (state, action: PayloadAction<string>) => {
      const updatedCart: ICartItem[] = state.cart.filter(cartItem => cartItem.id !== action.payload)

      state.totalPrice = updatedCart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0)
      state.cart = updatedCart
    },
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.products = action.payload
      state.filteredProducts = action.payload
    },
    createProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = [action.payload, ...state.products]
      state.filteredProducts = [action.payload, ...state.products]
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      const filterProducts = state.products.filter(product => product.id !== action.payload)

      state.products = filterProducts
      state.filteredProducts = filterProducts
    },
    filterProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.filteredProducts = action.payload
    }
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
