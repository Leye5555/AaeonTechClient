import { BENEFICIARIES, ADD_BENEFICIARY, DELETE_RESPONSE } from "../constants/actionTypes";
const beneficiaries = (state=[], action) => {
    switch (action.type) {
        case BENEFICIARIES:
            state = action.payload
            return state;
        case ADD_BENEFICIARY: 
           state = action.payload
           return state;
        case DELETE_RESPONSE :
            state = []
            return state;
        default:
            return state;
    }
}

export default beneficiaries;