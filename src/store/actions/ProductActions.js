import Product from '../../models/product'
import { createDocument } from '../../firebase/functions/FirestoreFunctions'
import { deleteProductAndImage, productCollection } from '../../firebase/functions/FirebaseFunctions'

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
  return {
    type: RESET_CART
  }
}

export const addItemToCart = (id, title, quantity, price, img) => {
  return async (dispatch, getState) => {
    const cartState = getState().products.cart
    const filteredCart = cartState.filter(item => item.id === id)

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
  return {
    type: DELETE_CART,
    product: {
      id
    }
  }
}

export const editItemFromCart = (id, quantity) => {
  return {
    type: EDIT_CART,
    product: { id, quantity }
  }
}

export const setProducts = (products) => {
  const loadedProducts = products.map(product => {
    return new Product(
      product.id,
      product.title,
      product.description,
      product.category,
      product.price,
      product.img
    )
  })

  return {
    type: SET_PRODUTS,
    products: loadedProducts
  }
}

export const createProduct = (title, description, category, price, img) => {
  return async dispatch => {
    const newProduct = {
      title: title,
      description: description,
      category: category,
      price: price,
      img: img
    }

    const responseId = await createDocument(productCollection, newProduct)

    dispatch({
      type: CREATE_PRODUCT,
      productAdded: new Product(
        responseId,
        title,
        description,
        category,
        price,
        img
      )
    })
  }
}

export const deleteProduct = (id, image) => {
  return async dispatch => {
    await deleteProductAndImage(id, image)

    dispatch({
      type: DELETE_PRODUCT,
      id
    })
  }
}

export const filterProducts = (filteredProducts) => {
  return {
    type: FILTER_PRODUCTS,
    filteredProducts: filteredProducts
  }
}
