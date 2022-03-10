import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { getTransactions } from "../actions/user";
import styled from "styled-components";
import { cardStyles } from "./Dashboard/ReusableStyles";
import setCommas from "../ReusableFunctions/setCommas";
import moment from "moment";

export default function AllTransfers() {
  localStorage.removeItem("beneficiary");
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const { name } = useParams();
  const id = JSON.parse(localStorage.getItem("user"))?._id;
  const transactions = useSelector((state) => state.transactions);
  useEffect(() => {
    dispatch(getTransactions(id));
    name === "all_credit_transactions" && setState("Credit");
    name === "all_debit_transactions" && setState("Debit");
  }, []);

  let slicedCredits = [];
  let slicedDebits = [];
  let creditLength = transactions.credits?.length - 1;
  let debitLength = transactions.debits?.length - 1;

  while (creditLength >= 0) {
    slicedCredits.push(transactions.credits[creditLength]);
    creditLength--;
  }
  while (debitLength >= 0) {
    slicedDebits.push(transactions.debits[debitLength]);
    debitLength--;
  }
  
  return (
    <>
      {state === "Credit" && (
        <Section>
          <div className="title">
            <h3>
              All <span>{`💹${state}`}</span> Transactions{" "}
            </h3>
            <h3
              onClick={() => setState("Debit")}
              style={{
                marginRight: "10px",
                float: "right",
                fontSize: "0.7rem",
                cursor: "pointer",
                border: "0.5px solid rgb(253,145,22)",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              See debits 🚀
            </h3>
          </div>
          <div className="transactions">
            {!transactions.credits?.length ? (
              <span
                style={{ width: "100%", textAlign: "center", display: "block" }}
              >
                Your transactions will show here
              </span>
            ) : (
              slicedCredits?.slice(0, 7).map((transaction, index) => {
                return (
                  <div className="transaction" key={index}>
                    <div className="transaction__title">
                      <span>{index + 1}</span>
                      <div className="transaction__title__image">
                        <CgProfile style={{ fontSize: "1rem", marginRight : "5px" }} />
                      </div>
                      <div className="transaction__title__details">
                        <h3> {transaction.senderName}</h3>
                        <h5>{moment(transaction.createdAt).fromNow()}</h5>
                      </div>
                    </div>
                    <div className="transaction__amount">
                      <span>+₦{setCommas(transaction.amount)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Section>
      )}
      {state === "Debit" && (
        <Section>
          <div className="title">
            <h3>
              All <span>{`⛔${state}`}</span> Transactions
            </h3>
            <h3
              onClick={() => setState("Credit")}
              style={{
                marginRight: "10px",
                float: "right",
                fontSize: "0.7rem",
                cursor: "pointer",
                border: "0.5px solid rgb(253,145,22)",
                borderRadius: "10px",
                padding: "5px",
              }}
            >
              See credits 🚀
            </h3>
          </div>
          <div className="transactions">
            {!transactions.debits?.length ? (
              <span
                style={{ width: "100%", textAlign: "center", display: "block" }}
              >
                Your transactions will show here
              </span>
            ) : (
              slicedDebits?.slice(0, 7).map((transaction, index) => {
                return (
                  <div className="transaction" key={index}>
                    <div className="transaction__title">
                      <span>{index + 1}</span>
                      <div className="transaction__title__image">
                        <CgProfile style={{ fontSize: "1rem", marginRight : "5px" }} />
                      </div>
                      <div className="transaction__title__details">
                        <h3>{transaction.receiverName}</h3>
                        <h5>{moment(transaction.createdAt).fromNow()}</h5>
                      </div>
                    </div>
                    <div className="transaction__amount">
                      <span>-₦{setCommas(transaction.amount)}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </Section>
      )}
    </>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  position : relative;
  flex-direction: column;
  align-items : flex-start;
  padding : 25px 20px; 
  width :calc( 100% - 22vw);
  top : 140px;
  left : 20vw;
  @media screen and (max-width : 1080px) {
    margin : 40px 0 60px 0;
    width : 100%;
    top : unset;
    left : unset;
  }
  .title {
    h3 {
      color: rgb(253, 145, 22);
      font-family: "Oswald", sans-serif;
      letter-spacing: 0.3rem;
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    align-items : flex-start;
    margin: 1rem 10px;
    width : 100%;
    height : 80%;
    .transaction {
      width : 100%;
      display: flex;
      margin : 20px 0;
      flex-flow : row nowrap;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 0.8rem !important;
      &__title {
        display: flex;
        flex-flow : row nowrap;
        width : 70%;
        svg {
          margin : 0 20px;
          @media screen and (max-width : 370px) {
            margin : 0 10px 0 20px;
          }
        }

        &__image {
          img {
            height: 2.5rem;
            border-radius: 3rem;
          }
        }
        &__details {
        }
      }
      &__amount {
        background-color: rgba(253, 145, 22, 0.3);
        padding: 0.2rem 0.5rem;
        color: rgb(253, 145, 22);
        width: max-content;
        border-radius: 1rem;
        text-align: center;
        justify-self : flex-start;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: rgb(253, 145, 22);
          span {
            color: black;
          }
        }
        span {
          color: #ffc107;
        }
      }
    }
  }
  .view {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text-decoration: none;
    color: rgb(253, 145, 22);
    font-weight: bold;
    margin-top: 1rem;
    gap: 0.5rem;
    svg {
      transition: 0.3s ease-in-out;
      font-size: 1.4rem;
    }
    &:hover {
      svg {
        transform: translateX(0.5rem);
      }
    }
  }

`;
