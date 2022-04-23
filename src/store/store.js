import ReduxThunk from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import OrderReducer from './reducers/OrderReducer'
import ProductReducer from './reducers/ProductReducer'
import { createStore, combineReducers, applyMiddleware } from 'redux'

const rootReducer = combineReducers({
  auth: AuthReducer,
  orders: OrderReducer,
  products: ProductReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default store
