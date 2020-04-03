import axios from 'axios'
export const apiAction = {
    getAPiCovid: () => async (dispatch) => {
        const api = "https://coronavirus-tracker-api.herokuapp.com/v2/locations"
        try {
            const response = await axios.get(api)
            const responseApi = await response.data.locations;
            console.log('response: ', responseApi)
            dispatch({ type: 'GET_API_SUCCESS', api: responseApi });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'GET_API_FAILED' });
        }
    }
}
