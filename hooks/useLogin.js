import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as AuthActions from '../store/actions/AuthActions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useLogin = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const tryLogin = async () => {
    setLoading(true)
    const userData = await AsyncStorage.getItem('userData')

    if (!userData) {
      setLoading(false)
      return
    }

    const transformedData = JSON.parse(userData)
    const { token, userId, expiryDate, isUserAdmin } = transformedData
    const expirationDate = new Date(expiryDate)

    if (expirationDate <= new Date() || !token || !userId) {
      setLoading(false)
      return
    }

    dispatch(AuthActions.autoAuthenticate(userId, token, isUserAdmin))
    setLoading(false)
  }

  return [tryLogin, loading]
}

export default useLogin