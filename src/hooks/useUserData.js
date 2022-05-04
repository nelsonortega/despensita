import { Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as UserActions from '../store/actions/UserActions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useUserData = () => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.userId)

  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const getUserData = async (id) => {
    setError(false)
    setLoading(true)

    const storageId = id || userId

    try {
      const userData = await AsyncStorage.getItem('userProfileData' + storageId)

      if (userData !== null) {
        const { name, phone, direction } = JSON.parse(userData)
        dispatch(UserActions.setUserInformation(name, phone, direction))
      }
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const saveUserData = async (newName, newPhone, newDirection) => {
    setLoading(true)
    setError(false)

    try {
      const userDataJSON = JSON.stringify({
        name: newName,
        phone: newPhone,
        direction: newDirection
      })

      await AsyncStorage.setItem('userProfileData' + userId, userDataJSON)
      dispatch(UserActions.setUserInformation(newName, newPhone, newDirection))
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (error) {
      Alert.alert('Error', 'Error al obtener o salvar los datos', [{ text: 'Ok' }])
    }
  }, [error])

  return { getUserData, saveUserData, loading }
}

export default useUserData
