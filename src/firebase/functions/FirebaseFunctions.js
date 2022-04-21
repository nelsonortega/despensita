import { firebaseAuth, firestoreStorage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

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

export async function isUserAdmin () {
  // TO DO
}

export async function uploadImage (imageUri) {
  const response = await fetch(imageUri)
  const blob = await response.blob()

  const storageRef = ref(firestoreStorage, 'images/' + Math.round(new Date().valueOf()).toString())
  await uploadBytes(storageRef, blob)

  const url = await getDownloadURL(storageRef)

  return url
}
