import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {getTransactions} from "../../actions/user";
import styled from "styled-components";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { cardStyles } from "./ReusableStyles";


export default function Earnings() {
  const [state, setState] = useState("Credit");
  const data = useSelector(state => state.transactions);
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("user"))?._id
  const account = JSON.parse(localStorage.getItem("account"));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  useEffect(() => {
    dispatch(getTransactions(id));
  }, [])

  return (
    <Section>
      { state === "Credit" && <> <div className="top">
        <div className="info">
          <h5 style={{textAlign : "center", lineHeight : "30px"}}> Chart of transactions for the month of <span style={{padding : "0.5rem", borderRadius : "20px", backgroundColor :"rgba(0,0,255, 0.5)"}}>{months[new Date().getMonth()]}</span></h5>
          <h3>{state}</h3>
          <h3 onClick={() => setState("Debit")} style={{marginRight : "20px", position  : "absolute", right : "-20px" , top : "5px", fontSize : "0.8rem", cursor : "pointer", border : "0.5px solid rgb(253,145,22)", borderRadius : "10px", padding : "1px"}}>See Debits 🚀</h3>
        </div>
      </div>
      <div className="chart">
        { !data.credits?.length ? <span style={{width : "100%", textAlign : "center", display : "block"}}>Your credit chart will show here</span> : <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data.credits}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip cursor={false} />
            <Area
              animationBegin={800}
              animationDuration={2000}
              type="monotone"
              dataKey="amount"
              stroke="rgb(253,145,22)"
              fill="rgba(253,145,22,0.4)"
              strokeWidth={4}
            />
          </AreaChart>
        </ResponsiveContainer>
       }
      </div> </>}
      { state === "Debit" && <> <div className="top">
        <div className="info">
          <h5 style={{textAlign : "center", lineHeight : "30px"}}> Chart of transactions for the month of <span style={{padding : "0.5rem", borderRadius : "20px", backgroundColor :"rgba(0,0,255, 0.5)"}}>{months[new Date().getMonth()]}</span></h5>
          <h3>{state}</h3>
          <h3 onClick={() => setState("Credit")} style={{marginRight : "20px", position  : "absolute", right : "20px" , fontSize : "0.8rem", right : "-20px" , top : "5px", cursor : "pointer", border : "0.5px solid rgb(253,145,22)", borderRadius : "10px", padding : "1px"}}>See Credits 🚀</h3>
        </div>
      </div>
      <div className="chart">
      { !data.debits?.length ? <span style={{width : "100%", textAlign : "center", display : "block"}}>Your debit chart will show here</span> : <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={300}
            height={400}
            data={data.debits}
            margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
          >
            <Tooltip cursor={false} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="rgb(253,145,22)"
              fill="rgba(253,145,22,0.4)"
              strokeWidth={4}
            />
          </AreaChart>
        </ResponsiveContainer>
       }
      </div> </>}
    </Section>
  );
}
const Section = styled.section`
  display: flex;
  position : relative;
  flex-direction: column;
  justify-content: space-between;
  min-height: 20rem;
  ${cardStyles}
  padding: 2rem 0 0 0;
  .top {
    .info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
      h1 {
        font-size: 2rem;
      }
      .growth {
        background-color: #d7e41e1d;
        padding: 0.5rem;
        border-radius: 1rem;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: rgb(253,145,22);
          span {
            color: black;
          }
        }
        span {
          color: rgb(253,145,22);
        }
      }
    }
  }
  .chart {
    height: 50%;
    .recharts-default-tooltip {
      background-color: black !important;
      border-color: black !important;
    }
  }

`;