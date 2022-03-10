import { DELETE_RESPONSE, MAKE_PAYMENT } from "../constants/actionTypes";
const makePayment = (state={}, action) => {
    switch (action.type) {
        case MAKE_PAYMENT:
            return {...state, ...action.payload}
        case DELETE_RESPONSE : 
             state = {};
             return state;
        default:
            return state;
    }
}

export default makePayment;