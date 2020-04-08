const api_th_province = [];
export const apiReducer_TH_PV = (state = api_th_province, action) => {
    switch (action.type) {
        case 'GET_API_TH_PV_SUCCESS':
            return action.api_th_province;
        case 'GET_API_TH_PV_FAILED':
            return action;
        default: return state;
    }
}