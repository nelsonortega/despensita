// import Product from '../../models/product'

// export const RESET_CART = 'RESET_CART'
// export const UPDATE_CART = 'UPDATE_CART'
// export const DELETE_CART = 'DELETE_CART'
// export const SET_PRODUTS = 'SET_PRODUTS'
// export const CREATE_PRODUCT = 'CREATE_PRODUCT'
// export const DELETE_PRODUCT = 'DELETE_PRODUCT'
// export const FILTER_PRODUCTS = 'FILTER_PRODUCTS'

// export const resetCart = () => {
//   return {
//     type: RESET_CART
//   }
// }

// export const addItemToCart = (productToAdd) => {
//   return {
//     type: UPDATE_CART,
//     product: productToAdd
//   }
// }

// export const editItemFromCart = (id, quantity) => {
//   return {
//     type: UPDATE_CART,
//     edit: true,
//     product: { id, quantity }
//   }
// }

// export const deleteItemFromCart = (id) => {
//   return {
//     type: DELETE_CART,
//     product: {
//       id
//     }
//   }
// }

// export const setProducts = (products) => {
//   const loadedProducts = products.map(product => {
//     return new Product(
//       product.id,
//       product.title,
//       product.description,
//       product.category,
//       product.price,
//       product.img
//     )
//   })

//   return {
//     type: SET_PRODUTS,
//     products: loadedProducts
//   }
// }

// export const createProduct = (newProduct) => {
//   return {
//     type: CREATE_PRODUCT,
//     productAdded: newProduct
//   }
// }

// export const deleteProduct = (id) => {
//   return {
//     type: DELETE_PRODUCT,
//     id
//   }
// }

// export const filterProducts = (filteredProducts) => {
//   return {
//     type: FILTER_PRODUCTS,
//     filteredProducts: filteredProducts
//   }
// }
