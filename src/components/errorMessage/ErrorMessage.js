import React from 'react';
import { useSelector } from 'react-redux';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import emoji from "../../images/emoji.png"

const ErrorMessage = ({onClick, pathname}) => {
    const user = useSelector(state => state.user);
    return (
        <Div>
            <div className="lds-ellipsis">
                <div>{user.message} <img src={emoji} alt="emoji" /></div>
                <Link to={pathname} className="return" onClick ={onClick} >Change details</Link>
            </div>
            
        </Div>
    )
}

export default ErrorMessage;

const Div = styled.div`
    width: 100%;
    height: 100%;
    z-index: 9999;
    position: fixed;
    background-color: rgba(253,145,22,0.5);
    .lds-ellipsis {
        width: 30%;
        height: 30%;
        position: absolute;
        inset : 0 0 0 0;
        top : 0;
        left : 0;
        right : 0;
        bottom : 0;
        margin : auto;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        background-color: rgb(0,0,0,0.8);
        color : rgb(253,145,22);
        div:nth-child(1) {
            width : max-content;
            height: max-content;
            border-radius: unset;
            background: unset;
            font-size: 1.9rem;
            transform : translateY(0px);
            display : flex;
            img {
                position : relative;
                display : block;
                
            }
            @media screen and (max-width:450px) {
                font-size : 1.5rem;
                img {
                    width: 50px;
                    height : 50px;
                }
            }
        }
        .return {
            display : block;
            text-decoration : none;
            position : absolute;
            inset : auto 0 10px 0;
            right : 0;
            bottom : 10px;
            left : 0;
            margin : auto;
            width : fit-content;
            height: fit-content;
            font-size : 16px;
            color : rgb(253,145,22);
            padding : 0.5rem;
            border-radius : 10px;
            background-color : blue; 
        }
    @media screen and (max-width : 1080px) {
        width : 60%;
    }
      @media (max-width: 768px) {
         width : 80%;
      }
      @media (max-width: 369px) {
        width : 95%;
     }
     @media (max-width: 300px) {
        width : 100%;
     }
    }
`;
