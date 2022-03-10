import { GET_NEWS } from "../constants/actionTypes";
const news = (state=[], action) => {
    switch(action.type) {
        case GET_NEWS : 
          state = action.payload;
          return state;
        default :
          return state;
    }
}


export default news;