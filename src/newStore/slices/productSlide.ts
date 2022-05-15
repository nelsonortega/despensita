import { createSlice } from '@reduxjs/toolkit'
import { IProduct } from '../../interfaces/IProduct'

interface IProductInitialState {
  filteredProducts: IProduct[]
  totalPrice: number
  products: IProduct[]
  cart: IProduct[]
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
    resetCart: (state, action) => {},
    addItemToCart: (state, action) => {},
    editItemFromCart: (state, action) => {},
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
