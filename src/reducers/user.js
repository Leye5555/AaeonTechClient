import Cookies from "universal-cookie";
import { CREATE_USER, LOGOUT, SIGN_IN_USER, CLEAR_USER, CLEAR_ERROR } from "../constants/actionTypes";
const cookie = new Cookies();
const user = (user=[], action) => {
    switch(action.type) {
        case CREATE_USER :
            if (!action.payload.message) {
                  localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("account", JSON.stringify(action.payload.newAccount))
            cookie.set("Auth_token", action.payload.token, {path : "/"});
            user = action.payload
            return user;
            }else {
                user = action.payload;
                return user;
            }   
        case SIGN_IN_USER :
            if (action.payload?.message === "Unauthorised user") {
                user = action.payload;
                return user;
            }else {
                localStorage.setItem("user", JSON.stringify(action.payload.user)); 
                localStorage.setItem("account", JSON.stringify(action.payload.account))
                cookie.set("Auth_token", action.payload.token, {path : "/"});
                user = action.payload.user;
                return user;
            }
          
        case LOGOUT :
            localStorage.clear();
            cookie.remove("Auth_token", {path : "/"}); 
            user = [];
            user.push(action.payload);
            return user;
        case CLEAR_USER :
            user = []
            return user;
        case CLEAR_ERROR : 
            user = action.payload
            return user;
        default :
           return user;
    }
}

export default user;