import { combineReducers } from 'redux'
import { apiReducer } from './api/reducer'
export const reducers = combineReducers({
    api: apiReducer,
})