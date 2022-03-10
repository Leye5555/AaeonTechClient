import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link} from "react-router-dom";
import styled from "styled-components";

const Response4 = ({ pathname, onClick, action }) => {
  const beneficiaries = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  return (
    <Div>
      <div className="lds-ellipsis">
        {!beneficiaries?.message ? (
          <>
            <div>Loading</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </>
        ) : (
          <div className="lds-ellipsis" >
            <div style={{fontSize : "1.3rem"}}> {beneficiaries?.message} </div>
            <section style={{display : "flex", flexFlow : "row nowrap", width : "100%", justifyContent : "space-between"}}>
              <Link to={pathname}  style={{textDecoration : "none", color : "rgb(253,145,22)"}} className="return" onClick={onClick}>
              <h6 onClick={() =>{dispatch({type : "REMOVE_RESPONSE", payload : {}});}} style={{fontSize : "0.95rem", cursor : "pointer", padding : "0.5rem", borderRadius : "5px", backgroundColor : "#212121"}}>
                 {action}
              </h6>
            </Link>
            <Link to="/myaccount/dashboard"  style={{textDecoration : "none", color : "rgb(253,145,22)"}} className="return" onClick={onClick}>
              <h6 onClick={() =>{dispatch({type : "REMOVE_RESPONSE", payload : {}})}} style={{fontSize : "0.95rem", cursor : "pointer", padding : "0.5rem", borderRadius : "5px", backgroundColor : "#212121"}}>
                Dashboard
              </h6>
            </Link>
            </section>
            
          </div>
        )}
      </div>
    </Div>
  );
};

export default Response4;

const Div = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9999;
  position: fixed;
  top : 0;
  bottom : 0;
  left : 0;
  right : 0;
  background-color: rgba(0, 0, 0, 0.7);
  .lds-ellipsis {
    width: 30%;
    height: 30%;
    position: absolute;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    margin: auto;
    border-radius : 5px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: rgb(253, 145, 22);
    color: blue;
    div {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: black;
      transform: translateY(10px);
    }
    div:nth-child(1) {
      width: max-content;
      height: max-content;
      border-radius: unset;
      background: unset;
      font-size: 2.2rem;
      transform: translateY(0px);
    }
    div:nth-child(2) {
      animation: lds-ellipsis1 0.6s infinite;
    }
    div:nth-child(3) {
      animation: lds-ellipsis2 0.6s 0.2s infinite;
    }
    div:nth-child(4) {
      animation: lds-ellipsis3 0.6s 0.3s infinite;
    }
    div:nth-child(5) {
      animation: lds-ellipsis4 0.6s 0.4s infinite;
    }
    @keyframes lds-ellipsis1 {
      0% {
        transform: scale(0) translateY(10px);
      }
      100% {
        transform: scale(1) translateY(10px);
      }
    }
    @keyframes lds-ellipsis2 {
      0% {
        transform: scale(0) translateY(10px);
      }
      100% {
        transform: scale(1) translateY(10px);
      }
    }
    @keyframes lds-ellipsis3 {
      0% {
        transform: scale(0) translateY(10px);
      }
      100% {
        transform: scale(1) translateY(10px);
      }
    }
    @keyframes lds-ellipsis4 {
      0% {
        transform: scale(0) translateY(10px);
      }
      100% {
        transform: scale(1) translateY(10px);
      }
    }
    @media (max-width: 768px) {
      width: 80%;
    }
    @media (max-width: 318px) {
      width: 100%;
    }
  }
`;
