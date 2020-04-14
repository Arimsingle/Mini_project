import { combineReducers } from 'redux'
import { apiReducer } from './api/reducer'
import { apiReducer_TH_TD } from "./api_TH_TD/reducer";
import { apiReducer_TH_PV } from "./api_TH_PV/reducer";
import { apiReducer_TH_GD } from "./api_TH_GD/reducer";
import { AuthReducer } from './auth/reducer'
import { DataArrayReducer } from './predict/reducer'
import { sessionReducer } from 'redux-react-session';
export const reducers = combineReducers({
    api: apiReducer,
    Api_TH_Today: apiReducer_TH_TD,
    Api_TH: apiReducer_TH_PV,
    Api_TH_GD: apiReducer_TH_GD,
    Auth: AuthReducer,
    DataArray: DataArrayReducer,
    session: sessionReducer
})
// sessionService.initSessionService(store);