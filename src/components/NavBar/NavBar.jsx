import React from "react";
import styled from "styled-components";
import {useParams} from "react-router-dom";
import "./styles.css";

export default function Navbar({className}) {
   const user = JSON.parse(localStorage.getItem("user"));
   const {name} = useParams();
  return (
    <Nav>
      <div className={`title ${className}`}>
        <h4>Hi {user?.fullName.split(" ")[0]},</h4>
        {
         name === "dashboard" && (<h1>
           Welcome to your <span>DASHBOARD</span>
        </h1>)
         }
        {
         name === "beneficiaries" && (<h1>
         <span>BENEFICIARIES</span>
        </h1>)
         }
         {
         name === "make-payment" && (<h1>
          Someone needs money? <span>MAKE PAYMENT</span>
        </h1>)
         }
         {
         name === "add-card" && (<h1>
          <span>ADD NEW CARD</span>
        </h1>)
         }
       
        
      </div>
      <div className={`user-id ${className}`}>
        <span>User ID : {user?._id.slice(18,25)}</span>
      </div>
    </Nav>
  );
}
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  color: blue;
 
  .title {
    h1 {
      animation : scrollNav1 1000ms forwards linear;
      transform : translateY(100px);
      opacity : 0;
      span {
        margin-left: 0.5rem;
        color: rgb(253,145, 22);
        font-family: 'Oswald', sans-serif;
        letter-spacing: 0.2rem;
      }
      @keyframes scrollNav1 {
        to {
          transform : translateY(0);
          opacity : 1;
        }
      }
    }
    h4 {
      animation : scrollNav1 1000ms forwards linear;
      transform : translateY(100px);
      opacity : 0;
    }
  }
  .user-id {
    background-color: #212121;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 8rem 1rem 1rem;
    border-radius: 1rem;
    animation : scrollNav2 1000ms forwards 300ms linear;
      transform : translateY(100px);
      opacity : 0;
    @keyframes scrollNav2 {
      to {
        transform : translateY(0);
        opacity : 1;
      }
    }
    @media screen and (max-width: 406px) {
        padding : 1rem 2rem 1rem 1rem;
    }
    @media screen and (max-width: 334px) {
        padding: 1rem 2rem 1rem 1rem;
        width : 81vw;
      }
    svg {
      color: rgb(253,145, 22);
    }
    span {
      background-color: transparent;
      border: none;
      color: rgb(253,145,22);
      width : max-content !important;
      display : block;
      font-weight : bold;
      font-family: 'Oswald', sans-serif;
      letter-spacing: 0.3rem;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: blue;
        font-weight : bold;
        font-family: 'Oswald', sans-serif;
      }
    }
    
  }
  @media screen and (min-width: 230px) and (max-width: 1080px) {
    flex-direction: column;
    .title {
      h1 {
        span {
          display: block;
          margin: 1rem 0;
          /* letter-spacing: 0; */
        }
      }
    }
  }
 
`;