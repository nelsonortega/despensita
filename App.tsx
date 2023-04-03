import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { StatusBar } from 'expo-status-bar'
import React, { ReactElement } from 'react'
import useCustomFonts from './src/hooks/useCustomFonts'
import RootNavigator from './src/navigation/RootNavigator'
import { CustomActivityIndicator } from './src/components'
import { Provider as PaperProvider } from 'react-native-paper'

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
