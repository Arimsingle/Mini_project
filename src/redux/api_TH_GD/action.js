import axios from 'axios'
export const apiAction_TH_GD = {
    getAPiCovid_TH_GD: () => async (dispatch) => {
        const api_th_gender = "https://covid19.th-stat.com/api/open/cases/sum";
        try {
            const response = await axios.get(api_th_gender)
            const responseApi = await response.data.Gender;
            dispatch({ type: 'GET_API_TH_GD_SUCCESS', api_th_gender: responseApi });
        } catch (error) {
            dispatch({ type: 'GET_API_TH_GD_FAILED' });
        }
    }
}
