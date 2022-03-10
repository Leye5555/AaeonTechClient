import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAnalyticsData } from "../../actions/user.js";
import styled from "styled-components";
import {GiMoneyStack} from "react-icons/gi";
import { FiActivity } from "react-icons/fi";
import { cardStyles } from "./ReusableStyles";
import setCommas from "../../ReusableFunctions/setCommas.js";
export default function Analytics() {
  const dispatch = useDispatch();
  const account = useSelector(state => state.analytics);
  const transactions = useSelector(state => state.transactions);
  let debits = 0;
  let credits = 0;
  transactions.debits?.forEach((debit) => { debits = debits + debit.amount });
  transactions.credits?.forEach((credit) => { credits = credits + credit.amount });
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  useEffect(() => {
  localStorage.getItem("user") && dispatch(getAnalyticsData(JSON.parse(localStorage.getItem("user"))._id))
  }, [account])
  return (
    <Section>
      <div className="analytic ">
        <div className="logo logo1">
           <GiMoneyStack className="logo1__stack"/>
        </div>
        <div className="content">
          <h5>Current Balance</h5>
          <h2 style={{fontSize : "1.2rem"}}>₦{setCommas(account?.balance)}</h2>
        </div>
      </div>
      <div className="analytic">
        <div className="logo">
        {months[new Date().getMonth()]}
        </div>
        <div className="content">
          <h5>Total Credits</h5>
          <h2 style={{fontSize : "1.2rem"}}>+₦{setCommas(credits)}</h2>
        </div>
      </div>
      <div className="analytic">
        <div className="logo" >
        {months[new Date().getMonth()]}
        </div>
        <div className="content">
          <h5>Total Debits</h5>
          <h2 style={{fontSize : "1.2rem"}}>-₦{setCommas(debits)}</h2>
        </div>
      </div>
      <div className="analytic ">
        <div className="content">
          <h5>Net Profit/Loss</h5>
          <h2 style={{fontSize : "1.2rem"}}>{credits - debits >= 0 ? "+₦" : "-₦"}{setCommas(Math.abs(credits - debits))}</h2>
        </div>
        <div className="logo">
          <FiActivity />
        </div>
      </div>
    </Section>
  );
}
const Section = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  .analytic {
    ${cardStyles};
    padding: 1rem;
    margin : 0.5rem 0;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: rgb(253, 145, 22);
      color: black;
      .logo {
          background-color: #212121;
          color : blue;
        }

     
    }
    .logo {
      background-color: rgb(253, 145, 22);
      border-radius: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      font-weight : bold;
      svg {
        font-size: 1.5rem;
        color : blue;
      }

  
    }
    .logo1 {
      padding: 0.5rem !important;
      &__stack {
        font-size : 3rem !important;
      }
    }
  }
  @media screen and (min-width: 230px) and (max-width: 720px) {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    .analytic {
      &:nth-of-type(3),
      &:nth-of-type(4) {
        flex-direction: row-reverse;
      }
    }
  }
`;
