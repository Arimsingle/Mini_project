export const AuthActions = {
    getLoginStatus: () => async (dispatch) => {
        const res = await axios.get(`http://localhost/api/auth`)
        dispatch({ type: 'GET_LOGIN_ATATUS', payload: res.data });
    },
    loginPSU: (username, password) => async (dispatch) => {
        console.log(+username.length)
        if (+username.length === 10 && +password.length > 6) {
            const res = await axios.post('http://localhost/api/auth/psu', { username, password })
            const { stdId, firstname, lastname, id, type } = res.data;
            console.log(res.data)
            if (type == '') {
                return console.log('username or password incorrect ^^')
            }
            else {
                dispatch({ type: 'LOGIN_PSU', payload: res.data })
            }
        }
    },
    logout: () => async (dispatch) => {
        const res = await axios.get(`http://localhost/api/auth/logout`)
        dispatch({ type: 'LOGOUT' })
    }
}