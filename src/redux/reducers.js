import { combineReducers } from 'redux'
import { apiReducer } from './api/reducer'
import { apiReducer_TH_TD } from "./api_TH_TD/reducer";
import { apiReducer_TH_PV } from "./api_TH_PV/reducer";
import { apiReducer_TH_GD } from "./api_TH_GD/reducer";
import { AuthReducer } from './auth/reducer'
export const reducers = combineReducers({
    api: apiReducer,
    Api_TH_Today: apiReducer_TH_TD,
    Api_TH: apiReducer_TH_PV,
    Api_TH_GD: apiReducer_TH_GD,
    Auth: AuthReducer,
})