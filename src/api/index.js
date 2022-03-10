import axios from "axios";
import Cookies from "universal-cookie";

const cookie = new Cookies();
const API = axios.create({ baseURL : "https://aaeon-tech.herokuapp.com" });

API.interceptors.request.use((req) => {
     const token = cookie.get("Auth_token");
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }
   return req;
})

export const newUser = async (user) => await API.post("/auth/sign_up", user);

export const loginUser = async (user) => await API.post("/auth/login", user);

export const makePayment = async (payment) => await API.patch("/make-payment", payment);

export const getAnalyticsData = async (id) => await API.get(`/set_analytics/${id}`);

export const getTransactions = async (id) => await API.get(`/transactions/${id}`);

export const addCard = async (cardDetails)=> await API.post("/confirm-card", cardDetails);

export const getCards = async (id) => await API.get(`/get_cards/${id}`);

export const getBanks = async () => await API.get("/bank");

export const getNews = async () => await API.get("/get_news");

export const getAllUsers = async () => API.get("/all_users");

export const getBeneficiaries = async (id) => API.get(`/get_beneficiaries/${id}`);

export const addBeneficiary = async (details) => API.post("/add_beneficiary", details);

export const logout = async () => API.get("/logout");

export const changePassword = async (details) => API.patch("/change_password", details);

export const deleteCard = async (id) => API.delete(`/delete_card/${id}`);

export const deleteAccount = async (details) => API.patch("/delete_account", details);

