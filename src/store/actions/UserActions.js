export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SET_USER_INFORMATION = 'SET_USER_INFORMATION'

export const login = (userId, token, isUserAdmin) => {
  return {
    type: LOGIN,
    userId: userId,
    token: token,
    isUserAdmin: isUserAdmin
  }
}

export const setUserInformation = (name, phone, direction) => {
  return {
    type: SET_USER_INFORMATION,
    name: name,
    phone: phone,
    direction: direction
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}
