import { useState } from 'react'
import store from './src/store/store'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import useFonts from './src/hooks/useFonts'
import { StatusBar } from 'expo-status-bar'
import RootNavigator from './src/navigation/RootNavigator'
import { Provider as PaperProvider } from 'react-native-paper'

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [fetchFonts, setFontError] = useFonts()

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={error => setFontError(error)}
      />
    )
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar style='light' />
        <RootNavigator />
      </PaperProvider>
    </Provider>
  )
}

export default App
