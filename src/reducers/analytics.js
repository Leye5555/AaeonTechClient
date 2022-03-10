import { ANALYTICS } from "../constants/actionTypes";
const analytics = (state = {}, action) => {
    switch(action.type) {
        case ANALYTICS : 
          localStorage.getItem("user") &&  action.payload && localStorage.setItem("account", JSON.stringify(action.payload));
           return {...state, ...action.payload};
        default : 
           return state;
    }
}

export default analytics;