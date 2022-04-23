export const LOGOUT = 'LOGOUT'
export const AUTHENTICATE = 'AUTHENTICATE'

export const authenticate = (userId, token, isUserAdmin) => {
  return {
    type: AUTHENTICATE,
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
