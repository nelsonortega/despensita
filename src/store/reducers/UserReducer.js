import { LOGIN, LOGOUT } from '../actions/UserActions'

const initialState = {
  token: null,
  userId: null,
  isUserAdmin: false
}

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
        isUserAdmin: action.isUserAdmin
      }
    case LOGOUT:
      return initialState
    default:
      return state
  }
}

export default UserReducer
