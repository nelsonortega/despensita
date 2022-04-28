export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (userId, token, isUserAdmin) => {
  return {
    type: LOGIN,
    userId: userId,
    token: token,
    isUserAdmin: isUserAdmin
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}
