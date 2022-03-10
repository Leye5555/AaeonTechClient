import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import Navbar from "../NavBar/NavBar";
import Button from "../Button/Button";
import Response3 from "../Response3";
import styled from "styled-components";
import { cardStyles } from "../Dashboard/ReusableStyles";
import {addBeneficiary, getBeneficiaries, getAllUsers} from "../../actions/user";
import "./styles.css";


export default function AllBeneficiaries() {
  localStorage.removeItem("beneficiary");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const [state, setState] = useState(true);
  const [addReceiver, setAddReceiver] = useState(false);
  const id = JSON.parse(localStorage.getItem("user"))?._id;
  const beneficiaries = useSelector((state) => state.beneficiaries);
  const [isResponse, setIsResponse] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(240);
  const allUsers = useSelector((state) => state.allUsers);
  const [paymentDetails, setPaymentDetails] = useState({
    userID : "",
    userName : "",
    beneficiaryEmail: "",
    beneficiaryName : ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      paymentDetails.receiverEmail === "" ||
      paymentDetails.receiverId === "" ||
      paymentDetails.senderPassword === ""
    ) {
      alert("Reset the values all input fields and try again.");
    } else if (paymentDetails.amount <= 0) {
      alert("amount cannot be zero");
    } else {
     
      if (paymentDetails.beneficiaryEmail === JSON.parse(localStorage.getItem("user"))?.email) {
        alert(
          "You cannot add yourself as a beneficiary"
        );
      } else {
        setIsResponse(true);
        if (isTimeOut === 240) {
          setTimeout(() => {
            dispatch(addBeneficiary(paymentDetails));
          }, isTimeOut);
          setIsTimeOut(isTimeOut - 1);
        } // debounce measure
      }
    }
  };



  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getBeneficiaries(id));
  }, [dispatch, isTimeOut]);

  let sortedBeneficiaries = [];
  let length = beneficiaries?.length - 1;


  while (length >= 0) {
    sortedBeneficiaries.push(beneficiaries[length]);
    length--;
  }
  

 
  return (
    <>
      {location.pathname === "/myaccount/beneficiaries" && (
          <>
          
          {
            state && <>
            <div className="nav_style" style={{position : "absolute", inset : "5vw 5vw auto auto", width : "75%"}}>
                  <Navbar className="display" />
            </div>
            {
             (<Section>
             
              <div className="title">
                <h3>
                  All Beneficiaries
                </h3>
                <h3
              onClick={() => {setAddReceiver(true); setState(false)}}
              style={{
                fontSize: "0.8rem",
                cursor: "pointer",
                border: "0.5px solid rgb(253,145,22)",
                borderRadius: "10px",
                padding: "1px",
                position : "absolute",
                right : "10px",
                top : "5px"
              }}
            >
              Add Beneciary
            </h3>
              </div>
              <div>
                {!beneficiaries?.filter(person => person?.userID === JSON.parse(localStorage.getItem("user"))._id)?.length ? (
                  <div style={{textAlign : "center"}}>
                     Your beneficiaries will show here
                 </div>
                ) : (
                  sortedBeneficiaries?.filter(person => person?.userID === JSON.parse(localStorage.getItem("user"))._id).slice(0, 7).map((person, index) => {
                    return (
                      <div className="transaction" key={index} >
                        <div className="transaction__title" >
                          <span style={{ transform : "translateX(-10px)", paddingRight : "0.2rem", fontSize : "0.85rem"}}>{index + 1}.</span> <span style={{paddingRight : "0.2rem", fontSize : "0.85rem"}}> <CgProfile style={{ fontSize: "1rem" }} /></span> <span>{person?.beneficiaryName}</span> <span onClick={()=> {localStorage.setItem("beneficiary", JSON.stringify({email: person?.beneficiaryEmail, _id : person?.beneficiaryId})); navigate("/myaccount/make-payment")}} style={{float : "right", cursor : "pointer", border : "1px solid white", color : "rgb(253,145,22)", borderRadius : "5px", fontSize : "0.85rem"}}>Send Money</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
              </Section>) 
               }
              </>
           }
        <>
        {
          addReceiver  && (<div className="payment-container-wrap">
           <Navbar  />
           <div className="payment-container">
             <div className="payment-grid">
               <div className="payment-card">
                 <input 
                   list = "receiver_email"
                   className="payment-input"
                   placeholder="Receiver's Email"
                   style={{ color: "rgb(253,145,22)" }}
                   onChange={(e) => {
                     setPaymentDetails({
                       ...paymentDetails,
                       userID: JSON.parse(localStorage.getItem("user"))
                         ?._id,
                       beneficiaryEmail:
                         e.target.value,
                        userName : JSON.parse(localStorage.getItem("user"))?.fullName,

                     });
                     setIsTimeOut(240);
                   }}
   
                 />
               </div>
               <div className="payment-card">
                 <input
                   className="payment-input"
                   placeholder="Receiver's Name"
                   style={{ color: "rgb(253,145,22)" }}
                   onChange={(e) => {
                     const receiver_id = allUsers?.filter((user) => user.fullName === e.target.value)[0]?._id.slice(18,25);
                   
                     setPaymentDetails({
                       ...paymentDetails,
                       beneficiaryName : e.target.value
                       
                     });
                     setIsTimeOut(240);
                   }}
                 />
               </div>
             </div>
           </div>
           <div
             style={{
               transform: "translateX(-0.5vw)",
               width: "72%",
               margin: "auto",
             }}
           >
             <Button
               secondary="secondary"
               fullWidth="fullWidth"
               text="Add"
               onClick={handleSubmit}
             />
           </div>
         </div>)
        }
      {isResponse && (
        <Response3
          action = {"New Beneficiary"}
          pathname="/myaccount/beneficiaries"
          onClick={() => {
            setIsResponse(false);
            setIsTimeOut(240);
          }}
        />
      )}
      
    </>
          
        </>
      )}
      
    </>
  );
}

const Section = styled.section`
  ${cardStyles};
  display: flex;
  position : relative;
  flex-direction: column;
  gap: 0.5rem 1rem;
  width: 80vw;
  height: max-content;
  margin: 50px auto;
  @media screen and (min-width: 1080px) {
    position: absolute;
    inset: 10vw 0 0 20vw;
    margin: auto;
    width: 70vw;
    height: max-content;
  }
  @media screen and (max-width : 430.5px) {
     width : 100vw;
     gap: 0;
     transform : translateY(-80px);
  }
  .title {
    height : max-content;
    padding : 30px 0px;
    h3 {
      color: rgb(253, 145, 22);
      font-family: "Oswald", sans-serif;
      letter-spacing: 0.3rem;
    }
    @media screen and (max-width : 379px) {
      span {
         font-size : 0.95rem !important;
      }
    }
  }
  .transactions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .transaction {
      display: flex;
      flex-flow : row nowrap;
      justify-content: space-between;
      align-items: flex-start;
      font-size: 0.8rem !important;
      &__title {
        display: flex;
        flex-flow : row nowrap;
        width : max-content;
        gap: 1rem;
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
        width: max(max-content, 4rem);
        border-radius: 1rem;
        text-align: center;
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
  @media screen and (min-width: 230px) and (max-width: 375px) {
    .transactions {
      .transaction {
        flex-direction: column;
        align-items: center;
        gap: 1rem;
      }
    }
  }
`;
