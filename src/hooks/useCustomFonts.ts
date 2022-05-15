import { useEffect } from 'react'
import { Alert } from 'react-native'
import { useFonts } from 'expo-font'

const useCustomFonts = (): [boolean] => {
  const [fontLoaded, error] = useFonts({
    'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf')
  })

  useEffect(() => {
    if (error !== null) {
      Alert.alert('Error', 'Error al cargar las fuentes', [{ text: 'Ok' }])
    }
  }, [error])

  return [fontLoaded]
}

export default useCustomFonts
