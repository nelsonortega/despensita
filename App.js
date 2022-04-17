import { useState } from 'react'
import * as Font from 'expo-font'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import AppLoading from 'expo-app-loading'
import { StatusBar } from 'expo-status-bar'
import RootNavigator from './navigation/RootNavigator'
import AuthReducer from './store/reducers/AuthReducer'
import DataReducer from './store/reducers/DataReducer'
import OrderReducer from './store/reducers/OrderReducer'
import ProductReducer from './store/reducers/ProductReducer'
import { Provider as PaperProvider } from 'react-native-paper'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const rootReducer = combineReducers({
  auth: AuthReducer,
  data: DataReducer,
  orders: OrderReducer,
  products: ProductReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false)

  const fetchFonts = () => {
    return Font.loadAsync({
      'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
  }

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts} 
        onFinish={() => setFontLoaded(true)} 
        onError={error => console.log(error)}
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