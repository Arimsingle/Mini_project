import axios from 'axios'
export const apiAction_TH_PV = {
    getAPiCovid_TH_PV: () => async (dispatch) => {
        const api_th_province = "https://covid19.th-stat.com/api/open/cases/sum";
        try {
            const response = await axios.get(api_th_province)
            const responseApi = await response.data.Province;
            dispatch({ type: 'GET_API_TH_PV_SUCCESS', api_th_province: responseApi });
        } catch (error) {
            console.error(error);
            dispatch({ type: 'GET_API_TH_PV_FAILED' });
        }
    }
}
