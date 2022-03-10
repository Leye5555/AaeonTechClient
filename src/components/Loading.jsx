import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'

const Loading = () => {
    const user = useSelector(state => state.user);
    return (
        <Div>{
               !user.message &&
               <div className="lds-ellipsis">
               <div>Loading</div>
               <div></div>
               <div></div>
               <div></div>
               <div></div>
           </div>
            }
           
        </Div>
    )
}

export default Loading;

const Div = styled.div`
    width: 100%;
    height: 100%;
    z-index: 9999;
    position: fixed;
    top : 0;
    bottom : 0;
    left : 0;
    right : 0;
    background-color: rgba(0,0,0,0.7);
    .lds-ellipsis {
        width: 30%;
        height: 30%;
        position: absolute;
        top : 0;
        bottom : 0;
        left : 0;
        right : 0;
        margin : auto;
        border-radius : 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        background-color: rgb(253, 145, 22);
        color : blue;
        div {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: black;
            transform : translateY(10px);
        }
        div:nth-child(1) {
            width : max-content;
            height: max-content;
            border-radius: unset;
            background: unset;
            font-size: 2.2rem;
            transform : translateY(0px);
        }
        div:nth-child(2) {
            animation: lds-ellipsis1 0.6s infinite;
        }
        div:nth-child(3) {
            animation: lds-ellipsis2 0.6s  0.2s infinite;
        }
        div:nth-child(4) {
            animation: lds-ellipsis3 0.6s  0.3s infinite;
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
         width : 80%;
      }
      @media (max-width: 318px) {
        width: 100%;
      }
    }
`;
