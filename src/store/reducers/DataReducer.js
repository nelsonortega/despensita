import { STATES, CATEGORIES } from '../../data/data'

const initialState = {
  states: STATES,
  categories: CATEGORIES
}

const DataReducer = (state = initialState, action) => {
  return state
}

export default DataReducer
