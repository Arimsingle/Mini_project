import { combineReducers } from 'redux'
import { apiReducer } from './api/reducer'
import { AuthReducer } from './auth/reducer'
export const reducers = combineReducers({
    api: apiReducer,
    Auth: AuthReducer
})