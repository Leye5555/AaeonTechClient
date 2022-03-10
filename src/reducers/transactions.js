import {TRANSACTION} from "../constants/actionTypes"
const transactions = (state={}, action) => {
    switch (action.type) {
        case TRANSACTION:
            return {...state, ...action.payload}
        default:
           return state;
    }
}

export default transactions;