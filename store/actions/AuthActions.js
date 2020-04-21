import FirebaseKey from '../../constants/FirebaseKey'

import { AsyncStorage } from 'react-native'

export const LOGOUT = 'LOGOUT'
export const AUTHENTICATE = 'AUTHENTICATE'

const REGISTER_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + FirebaseKey.FirebaseConfig.apiKey
const LOGIN_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + FirebaseKey.FirebaseConfig.apiKey

export const autoAuthenticate = (userId, token) => {
  return { type: AUTHENTICATE, userId: userId, token: token }
}

export const authenticate = (email, password, login) => {
  return async dispatch => {
    const response = await fetch(
      login ? LOGIN_URL : REGISTER_URL,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    )
  
    if (!response.ok) {
      let message = 'Algo salio mal'
      const errorResponse = await response.json()
      const error = errorResponse.error.message

      if (error === 'INVALID_EMAIL') {
        message = 'El correo electrónico no es válido'
      } else if (error === 'EMAIL_NOT_FOUND') {
        message = 'El correo electrónico no está registrado'
      } else if (error === 'INVALID_PASSWORD') {
        message = 'La contraseña es incorrecta'
      } else if (error === 'USER_DISABLED') {
        message = 'El usuario fue deshabilitado'
      } else if (error === 'EMAIL_EXISTS') {
        message = 'El correo electrónico ya está registrado'
      } else {
        message = error
      }
      
      throw new Error(message);
    }
  
    const responseData = await response.json()
    dispatch({ type: AUTHENTICATE, token: responseData.idToken, userId: responseData.localId })
    const expirationDate = new Date(new Date().getTime() + parseInt(responseData.expiresIn) * 1000)
    saveDataToStorage(responseData.idToken, responseData.localId, expirationDate)
  }
}

export const logout = () => {
  AsyncStorage.removeItem('userData')
  return { type: LOGOUT }
}

const saveDataToStorage = (token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    token: token,
    userId: userId,
    expirationDate: expirationDate.toISOString()
  }))
}