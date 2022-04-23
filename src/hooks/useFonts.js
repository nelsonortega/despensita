import * as Font from 'expo-font'
import { Alert } from 'react-native'
import { useEffect, useState } from 'react'

const useFonts = () => {
  const [fontError, setFontError] = useState()

  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf')
    })
  }

  useEffect(() => {
    if (fontError) {
      Alert.alert('Error', 'Error al cargar las fuentes', [{ text: 'Ok', onPress: () => setFontError(null) }])
    }
  }, [fontError])

  return [fetchFonts, setFontError]
}

export default useFonts
