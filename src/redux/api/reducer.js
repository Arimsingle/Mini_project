const api = [];
export const apiReducer = (state = api, action) => {
    switch (action.type) {
        case 'GET_API_SUCCESS':
            return action.api;
        case 'GET_API_FAILED':
            return action;
        default: return state;
    }
}