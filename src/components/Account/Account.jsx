import React,{useEffect} from 'react';
import {useLocation} from "react-router-dom";
import styled from "styled-components";
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import {useParams, useNavigate} from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Payment from "../Payment/Payment";
import Sidebar from '../SideBar';
import AllTransfers from '../AllTransfers';
import AllBeneficiaries from '../Beneficiaries/Beneficiaries';
import AddCard from '../AddCard/AddCard';
import Settings from '../Settings/Settings';
import AllCards from '../AllCards';

const Account = () => {
    const {name} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));  
    const cookie = new Cookies();
    const token = cookie.get('Auth_token');
    const isUser = () => { 
        if(token !== undefined){
          return jwt_decode(token)._id === user?._id;
        }else {
            return false;
        }
    }


    useEffect(() => {
        if (location.pathname === "/myaccount/dashboard") {
            window.scrollTo(0, 0);
        } 
        isUser() === false && navigate("/auth")
    }, [location.pathname]);
    return (
        <Div> 
        {
            isUser() && (
            <div>
                <Sidebar />
                {
                    (name === 'dashboard') && <Dashboard />
                }
                {
                    (name === 'beneficiaries') && <AllBeneficiaries />
                }
                {
                    (name === 'make-payment') && <Payment />
                }
                {
                    (name === 'add-card') && <AddCard />
                }
                {
                    (name === 'settings') && <Settings />
                }
                {
                    ( name === "all_credit_transactions" && <AllTransfers />)
                }
                {
                    ( name === "all_debit_transactions" && <AllTransfers />)
                }
               {
                   (name === "all_cards" && <AllCards />)
               }
           </div>
           )  
        }
        
        </Div>
    )
}

export default Account;


const Div = styled.div`
    width: 100%;
    height : 100vh;
    overflow-x: hidden;
    position: relative;
`;