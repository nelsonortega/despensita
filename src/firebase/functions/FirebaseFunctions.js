import { firebaseAuth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'

export async function loginUser (email, password) {
  let loginResponse = {
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
  let registerResponse = {
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
