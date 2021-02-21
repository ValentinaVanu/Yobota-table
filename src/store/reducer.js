import { combineReducers } from 'redux'
import { yobotaReducer } from './yobota.reducer'

const createReducer = asyncReducers => combineReducers({
  yobota: yobotaReducer,
  ...asyncReducers
})

export default createReducer
