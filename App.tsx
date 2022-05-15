import { ReactElement } from 'react'
import store from './src/store/store'
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar'
import useCustomFonts from './src/hooks/useCustomFonts'
import RootNavigator from './src/navigation/RootNavigator'
import { Provider as PaperProvider } from 'react-native-paper'
import CustomActivityIndicator from './src/components/CustomActivityIndicator'

const App = (): ReactElement => {
  const [isFontLoaded] = useCustomFonts()

  if (!isFontLoaded) {
    return <CustomActivityIndicator />
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
