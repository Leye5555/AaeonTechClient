import * as api from "../api/index.js";
import {CREATE_USER, SIGN_IN_USER, MAKE_PAYMENT, ANALYTICS, TRANSACTION, ADD_CARD, GET_CARDS, DELETE_CARD, CHANGE_PASSWORD, DELETE_ACCOUNT, GET_NEWS, GET_ALL_USERS, BENEFICIARIES, ADD_BENEFICIARY, LOGOUT, GET_BANKS} from "../constants/actionTypes";
export const newUser = (newUser) => async (dispatch) => {
    try {
      const {data} = await api.newUser(newUser);
      dispatch({type : CREATE_USER, payload : data});
    }catch(error) {
        console.log(error);
    }
}

export const loginUser = (user) => async (dispatch) => {
   try {
       const {data} = await api.loginUser(user);
       dispatch({type : SIGN_IN_USER, payload : data});
   }catch(err){
       console.log(err);
   }
}

export const makePayment = (payment) => async (dispatch) => {
    try{
        const {data} = await api.makePayment(payment);
        dispatch({type : MAKE_PAYMENT, payload : data})
    }catch(err){
        console.log(err);
    }
}

export const getAnalyticsData = (id) => async (dispatch) => {
    try{
        const {data} = await api.getAnalyticsData(id);
        dispatch({type : ANALYTICS, payload : data}); 
    }catch(err){
        console.log(err)
    }
}

export const getTransactions = (id) => async (dispatch) => {
    try {
        const {data} = await api.getTransactions(id)
        dispatch({type : TRANSACTION, payload : data});
    }catch(err) {
       console.log(err);
    }
}

export const addCard = (cardDetails) => async (dispatch) => {
    try{
        const {data} = await api.addCard(cardDetails);
        dispatch({type : ADD_CARD, payload : data});
    }catch(err) {
        console.log(err);
    }
}

export const getCards= (id) => async (dispatch) => {
    try{
       const {data} = await api.getCards(id)
       dispatch({type : GET_CARDS, payload : data});
    }catch(err){
       console.log(err)
    }
}

export const deleteCard = (id) => async (dispatch) => {
       try{
            const {data} = await api.deleteCard(id);
            dispatch({type : DELETE_CARD, payload : data})
       }catch(err) {
           console.log(err);
       }
}

export const changePassword = (details) => async (dispatch) => {
    try{
         const {data} = await api.changePassword(details);
         dispatch({type : CHANGE_PASSWORD, payload : data})
    }catch(err) {
        console.log(err);
    }
}

export const deleteAccount = (details) => async (dispatch) => {
    try{ 
        const {data} = await api.deleteAccount(details);
        dispatch({type : DELETE_ACCOUNT, payload : data});
    }catch(err) {
        console.log(err);
    }
}

export const getNews = () => async (dispatch) => {
    try{
        const {data} = await api.getNews();
        dispatch({type : GET_NEWS, payload : data});
    }catch(err) {
        console.log(err)
    }
}

export const getBanks = () => async (dispatch) => {
    try {
         const {data} = await api.getBanks();
         dispatch({type : GET_BANKS, payload : data})
    }catch(err){
        console.log(err)
    }
}

export const getAllUsers = () => async (dispatch) => {
    try{
        const {data} = await api.getAllUsers();
        dispatch({type : GET_ALL_USERS, payload : data});
    }catch(err){
        console.log(err);
    }
}

export const getBeneficiaries = (id) => async (dispatch) => {
   try{
      const {data} = await api.getBeneficiaries(id);
      dispatch({type : BENEFICIARIES, payload : data});
   }catch(err) {
       console.log(err);
   }
}

export const addBeneficiary = (details)=> async (dispatch) => {
  try{
       const {data} = await api.addBeneficiary(details);
       dispatch({type : ADD_BENEFICIARY, payload : data})
  }catch(err) {
      console.log(err)
  }
}
export const logout = () => async (dispatch) => {
    try{
      const {data} = await api.logout()
       dispatch({type : LOGOUT, payload : data})
    }catch(err){
        console.log(err)
    }
}