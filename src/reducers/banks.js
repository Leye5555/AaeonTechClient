import { GET_BANKS } from "../constants/actionTypes";
const banks = (state=[], action) => {
    switch (action.type) {
        case GET_BANKS:
            state = action.payload
            return state;
        default:
            return state;
    }
}

export default banks;