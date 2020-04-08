const api_th_gender = [];
export const apiReducer_TH_GD = (state = api_th_gender, action) => {
    switch (action.type) {
        case 'GET_API_TH_GD_SUCCESS':
            return action.api_th_gender;
        case 'GET_API_TH_GD_FAILED':
            return action;
        default: return state;
    }
}