import Cookies from "universal-cookie";
import { CHANGE_PASSWORD, DELETE_CARD, DELETE_ACCOUNT, REMOVE_RESPONSE } from "../constants/actionTypes";
const cookie = new Cookies();
const settings = (state={}, action) => {
     switch(action.type) {
         case CHANGE_PASSWORD : 
            state = action.payload;
            console.log(state);
            return state;
         case DELETE_CARD :
             state = action.payload;
             console.log(state);
             return state;
         case DELETE_ACCOUNT :
             if (action.payload.message === "Account deleted") {
             localStorage.clear()
             cookie.remove("Auth_token", {path : "/"});
                }
             state = action.payload;
             return state;
         case REMOVE_RESPONSE :
             state = action.payload;
             return state;
         default :
          return state;
     }
}

export default settings;