import { GET_ALL_USERS } from "../constants/actionTypes";
const allUsers = (state = [], action) => {
    switch (action.type) {
        case GET_ALL_USERS:
            state = action.payload;
            return state;
        default:
            return state;
    }
}

export default allUsers;