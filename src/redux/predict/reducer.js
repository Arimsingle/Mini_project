const initialDataArray = [];
export const DataArrayReducer = (data = initialDataArray, action) => {
    switch (action.type) {
        case 'GET_DATA_ARRAY':
            return action.paylaod;
        default: return data;
    }
}