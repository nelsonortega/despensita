import { getAllDocuments } from './FirestoreFunctions'
import { collection, query, where } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { firebaseAuth, firestoreDB, firestoreStorage } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

const userCollection = collection(firestoreDB, 'users')
export const orderCollection = collection(firestoreDB, 'orders')
export const productCollection = collection(firestoreDB, 'products')

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
  try {
    const adminUsersResponse = await getAllDocuments(userCollection)

    if (!adminUsersResponse.success) {
      return false
    }

    const [adminUsers] = adminUsersResponse.documents
    const isUserAdmin = adminUsers.adminUsers.find(adminUserId => adminUserId === user.uid)

    return isUserAdmin !== undefined
  } catch (error) {
    return false
  }
}

export async function uploadImage (imageUri) {
  const response = await fetch(imageUri)
  const blob = await response.blob()

  const storageRef = ref(firestoreStorage, 'images/' + Math.round(new Date().valueOf()).toString())
  await uploadBytes(storageRef, blob)

  const url = await getDownloadURL(storageRef)

  return url
}

export async function getOrders (isUserAdmin, userId) {
  const ordersResponse = {
    success: true,
    orders: []
  }

  const ordersQuery = isUserAdmin
    ? query(orderCollection, where('state', '<', 4))
    : query(orderCollection, where('clientData.userId', '==', userId), where('state', '<', 4))

  try {
    const documentsResponse = await getAllDocuments(ordersQuery)

    if (!documentsResponse.success) {
      ordersResponse.success = false
    } else {
      ordersResponse.orders = documentsResponse.documents
    }

    return ordersResponse
  } catch (error) {
    ordersResponse.success = false

    return ordersResponse
  }
}
