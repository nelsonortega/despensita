import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUserInformation {
  name: string
  phone: string
  direction: string
}

interface IUserInitialState {
  token: string
  userId: string
  isUserAdmin: boolean
  userInformation: IUserInformation
}

interface ILoginAction {
  userId: string
  token: string
  isUserAdmin: boolean
}

const initialState: IUserInitialState = {
  token: '',
  userId: '',
  isUserAdmin: false,
  userInformation: {
    name: '',
    phone: '',
    direction: ''
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILoginAction>) => {
      state.token = action.payload.token
      state.userId = action.payload.userId
      state.isUserAdmin = action.payload.isUserAdmin
    },
    setUserInformation: (state, action: PayloadAction<IUserInformation>) => {
      state.userInformation = action.payload
    },
    logout: (state) => {
      state.token = ''
      state.userId = ''
      state.isUserAdmin = false
      state.userInformation = {
        name: '',
        phone: '',
        direction: ''
      }
    }
  }
})

export const {
  login,
  setUserInformation,
  logout
} = userSlice.actions

export const userReducer = userSlice.reducer
