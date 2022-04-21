import { collection } from 'firebase/firestore'
import { getAllDocuments } from './FirestoreFunctions'
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
  const [adminUsersResponse] = await getAllDocuments(userCollection)
  const isUserAdmin = adminUsersResponse.adminUsers.find(adminUserId => adminUserId === user.uid)

  return isUserAdmin !== undefined
}

export async function uploadImage (imageUri) {
  const response = await fetch(imageUri)
  const blob = await response.blob()

  const storageRef = ref(firestoreStorage, 'images/' + Math.round(new Date().valueOf()).toString())
  await uploadBytes(storageRef, blob)

  const url = await getDownloadURL(storageRef)

  return url
}
