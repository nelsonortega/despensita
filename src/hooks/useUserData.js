import { Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useUserData = () => {
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
        const transformedData = JSON.parse(userData)
        return transformedData
      }
    } catch (error) {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const setUserData = async (newName, newPhone, newDirection) => {
    setLoading(true)
    setError(false)

    try {
      const userDataJSON = JSON.stringify({
        name: newName,
        phone: newPhone,
        direction: newDirection
      })

      await AsyncStorage.setItem('userProfileData' + userId, userDataJSON)
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

  return [getUserData, setUserData, loading]
}

export default useUserData
