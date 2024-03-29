import { firebaseAuth, firestoreDB, firestoreStorage } from '../firebase'
import { collection, deleteDoc, doc, query, where } from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { createDocument, getAllDocuments, updateDocument } from './FirestoreFunctions'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const userCollection = collection(firestoreDB, 'users')
const orderCollection = collection(firestoreDB, 'orders')
const productCollection = collection(firestoreDB, 'products')

export async function loginUser (email, password) {
  const loginResponse = {
    success: false,
    errorMessage: '',
    userResponse: {}
  }

  try {
    loginResponse.userResponse = await signInWithEmailAndPassword(firebaseAuth, email, password)
    loginResponse.success = true

    return loginResponse
  } catch (error) {
    loginResponse.errorMessage = error.message
    return loginResponse
  }
}

export async function registerUser (email, password) {
  const registerResponse = {
    success: false,
    errorMessage: '',
    userResponse: {}
  }

  try {
    registerResponse.userResponse = await createUserWithEmailAndPassword(firebaseAuth, email, password)
    registerResponse.success = true

    return registerResponse
  } catch (error) {
    registerResponse.errorMessage = error.message
    return registerResponse
  }
}

export async function logoutUser () {
  try {
    await signOut(firebaseAuth)
  } catch (error) {
    return error
  }
}

export async function isUserAdmin (user) {
  const adminUsersResponse = await getAllDocuments(userCollection)

  if (!adminUsersResponse.success) {
    return false
  }

  const [adminUsers] = adminUsersResponse.documents
  const isUserAdmin = adminUsers.adminUsers.find(adminUserId => adminUserId === user.uid)

  return isUserAdmin !== undefined
}

export async function uploadImage (imageUri) {
  const imageUploadResponse = {
    success: true,
    url: ''
  }

  try {
    const response = await fetch(imageUri)
    const blob = await response.blob()

    const storageRef = ref(firestoreStorage, 'images/' + Math.round(new Date().valueOf()).toString())
    await uploadBytes(storageRef, blob)

    const url = await getDownloadURL(storageRef)

    imageUploadResponse.url = url

    return imageUploadResponse
  } catch (error) {
    imageUploadResponse.success = false

    return imageUploadResponse
  }
}

export async function getOrders (isUserAdmin, userId) {
  const ordersResponse = {
    success: true,
    orders: []
  }

  const ordersQuery = isUserAdmin
    ? query(orderCollection, where('state', '<', 4))
    : query(orderCollection, where('clientData.userId', '==', userId), where('state', '<', 4))

  const documentsResponse = await getAllDocuments(ordersQuery)

  if (!documentsResponse.success) {
    ordersResponse.success = false
  } else {
    ordersResponse.orders = documentsResponse.documents
  }

  return ordersResponse
}

export async function getProducts () {
  const productsResponse = {
    success: true,
    products: []
  }

  const documentsResponse = await getAllDocuments(productCollection)

  if (!documentsResponse.success) {
    productsResponse.success = false
  } else {
    productsResponse.products = documentsResponse.documents
  }

  return productsResponse
}

export async function deleteProductAndImage (id, image) {
  const deleteResponse = {
    success: true
  }

  const imageToDelete = ref(firestoreStorage, image)
  const productToDelete = doc(productCollection, id)

  try {
    await deleteDoc(productToDelete)
    await deleteObject(imageToDelete)

    return deleteResponse
  } catch (error) {
    deleteResponse.success = false
    return deleteResponse
  }
}

export async function updateOrder (newOrder) {
  const updateOrderResponse = {
    success: true
  }

  const updateResponse = await updateDocument(orderCollection, newOrder.id, newOrder)

  if (!updateResponse.success) {
    updateOrderResponse.success = false
  }

  return updateOrderResponse
}

export async function createProduct (newProduct) {
  const createProductResponse = {
    success: true,
    productId: ''
  }

  const documentResponse = await createDocument(productCollection, newProduct)

  if (documentResponse.success) {
    createProductResponse.productId = documentResponse.documentId
  } else {
    createProductResponse.success = false
  }

  return createProductResponse
}

export async function createOrder (newOrder) {
  const createOrderResponse = {
    success: true,
    orderId: ''
  }

  const documentResponse = await createDocument(orderCollection, newOrder)

  if (documentResponse.success) {
    createOrderResponse.orderId = documentResponse.documentId
  } else {
    createOrderResponse.success = false
  }

  return createOrderResponse
}
