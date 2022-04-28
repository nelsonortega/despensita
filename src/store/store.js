import UserReducer from './reducers/UserReducer'
import OrderReducer from './reducers/OrderReducer'
import { createStore, combineReducers } from 'redux'
import ProductReducer from './reducers/ProductReducer'

const rootReducer = combineReducers({
  user: UserReducer,
  orders: OrderReducer,
  products: ProductReducer
})

const store = createStore(rootReducer)

export default store
