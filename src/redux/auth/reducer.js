const initAuthData = {
    accessToken: null,
    psuInfo: null,
}
export const AuthReducer = (data = initAuthData, action) => {
    switch (action.type) {
        case 'GET_LOGIN_ATATUS': return action.payload;
        case 'LOGIN_PSU': return { ...data, psuInfo: action.payload };
        case 'LOGOUT': return initAuthData
        default: return data
    }
}