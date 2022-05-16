// import { LOGIN, LOGOUT, SET_USER_INFORMATION } from '../actions/UserActions'

// const initialState = {
//   token: null,
//   userId: null,
//   isUserAdmin: false,
//   userInformation: {
//     name: '',
//     phone: '',
//     direction: ''
//   }
// }

// const UserReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LOGIN:
//       return {
//         ...state,
//         token: action.token,
//         userId: action.userId,
//         isUserAdmin: action.isUserAdmin
//       }
//     case SET_USER_INFORMATION:
//       return {
//         ...state,
//         userInformation: {
//           name: action.name,
//           phone: action.phone,
//           direction: action.direction
//         }
//       }
//     case LOGOUT:
//       return initialState
//     default:
//       return state
//   }
// }

// export default UserReducer
