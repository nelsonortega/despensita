import Product from '../../models/product'

import { productCollection } from '../../constants/FirestoreCollections'
import { createDocument, getAllDocuments, deleteDocument } from './FirestoreActions'

export const ADD_CART = 'ADD_CART'
export const EDIT_CART = 'EDIT_CART'
export const RESET_CART = 'RESET_CART'
export const SET_PRODUTS = 'SET_PRODUTS'
export const UPDATE_CART = 'UPDATE_CART'
export const DELETE_CART = 'DELETE_CART'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

export const resetCart = () => {
  return async dispatch => {
    dispatch({ type: RESET_CART })
  }
}

export const addItemToCart = (id, title, quantity, price, img) => {
  return async (dispatch, getState) => {
    const cartState = getState().products.cart
    let filteredCart = cartState.filter(item => item.id === id)

    if (filteredCart.length > 0) {
      dispatch({
        type: UPDATE_CART,
        product: {
          id,
          quantity
        }
      })
    } else {
      dispatch({
        type: ADD_CART,
        product: {
          id,
          title,
          quantity,
          price,
          img
        }
      })
    }
  }
}

export const deleteItemFromCart = (id) => {
  return async dispatch => {
    dispatch({
      type: DELETE_CART,
      product: {
        id
      }
    })
  }
}

export const editItemFromCart = (id, quantity) => {
  return async dispatch => {
    dispatch({
      type: EDIT_CART,
      product: {
        id,
        quantity
      }
    })
  }
}

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const loadedProducts = []
      const responseData = await getAllDocuments(productCollection)

      responseData.forEach(product => {
        loadedProducts.push(new Product(
          product.id,
          product.title,
          product.description,
          product.category,
          product.price,
          product.img
        ))
      })

      dispatch ({ type: SET_PRODUTS, products: loadedProducts })
    } catch (error) {
      throw error
    }
  }
}

export const createProduct = (title, description, category, price, img) => {
  return async dispatch => {
    let newProduct = {
      "title": title, 
      "description": description, 
      "category": category, 
      "price": price, 
      "img": img
    }

    const response = await createDocument(productCollection, newProduct)

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        response,
        title,
        description,
        category,
        price,
        img
      }
    })
  }
}

export const deleteProduct = (id) => {
  return async dispatch => {

    deleteDocument(productCollection, id)

    dispatch({
      type: DELETE_PRODUCT,
      id
    })
  }
}

export const filterProducts = (filteredProducts) => {
  return async dispatch => {
    dispatch({
      type: FILTER_PRODUCTS,
      filteredProducts: filteredProducts
    })
  }
}