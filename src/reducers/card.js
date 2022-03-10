import { ADD_CARD,DELETE_RESPONSE,GET_CARDS } from "../constants/actionTypes";
const card = (state=[], action) => {
    switch (action.type) {
        case ADD_CARD:
            return {...state, ...action.payload};
        case  GET_CARDS : 
           state = action.payload;
           return state;
        case DELETE_RESPONSE:
            state = {}
            return state;
        default:
            return state;
    }
}

export default card;