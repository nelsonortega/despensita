import * as Font from 'expo-font'
import { Alert } from 'react-native'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import { useState, useEffect } from 'react'
import AuthReducer from './src/store/reducers/AuthReducer'
import RootNavigator from './src/navigation/RootNavigator'
import OrderReducer from './src/store/reducers/OrderReducer'
import { Provider as PaperProvider } from 'react-native-paper'
import ProductReducer from './src/store/reducers/ProductReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const rootReducer = combineReducers({
  auth: AuthReducer,
  orders: OrderReducer,
  products: ProductReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App = () => {
  const [fontError, setFontError] = useState()
  const [fontLoaded, setFontLoaded] = useState(false)

  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./src/assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf')
    })
  }

  useEffect(() => {
    if (fontError) {
      Alert.alert('Error', 'Error al cargar las fuentes', [{ text: 'Ok', onPress: () => setFontError(null) }])
    }
  }, [fontError])

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
