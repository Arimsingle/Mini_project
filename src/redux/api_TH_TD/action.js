import axios from 'axios'
export const apiAction_TH_TD = {
    getAPiCovid_TH_TD: () => async (dispatch) => {
        const api_th_today = "https://covid19.th-stat.com/api/open/today";
        try {
            const response = await axios.get(api_th_today)
            const responseApi = await response.data;
            dispatch({ type: 'GET_API_TH_TD_SUCCESS', api_th_today: responseApi });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'GET_API_TH_TD_FAILED' });
        }
    }
}
