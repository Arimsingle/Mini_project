const api_th_today = [];
export const apiReducer_TH_TD = (state = api_th_today, action) => {
    switch (action.type) {
        case 'GET_API_TH_TD_SUCCESS':
            return action.api_th_today;
        case 'GET_API_TH_TD_FAILED':
            return action;
        default: return state;
    }
}