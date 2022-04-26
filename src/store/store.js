import AuthReducer from './reducers/AuthReducer'
import OrderReducer from './reducers/OrderReducer'
import { createStore, combineReducers } from 'redux'
import ProductReducer from './reducers/ProductReducer'

const rootReducer = combineReducers({
  auth: AuthReducer,
  orders: OrderReducer,
  products: ProductReducer
})

const store = createStore(rootReducer)

export default store
