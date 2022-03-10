import React, {useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCards } from '../actions/user';
import { cardStyles } from './Dashboard/ReusableStyles';

const AllCards = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cards = useSelector(state => state.card);
    useEffect(() => { 
        dispatch(getCards(JSON.parse(localStorage.getItem("user"))?._id));
    }, [dispatch])
    return (
            <Section>
              <div className="title">
                <h3>
                  All Cards
                </h3>
                <Link to="/myaccount/add-card" style={{textDecoration : "none", color : "white"}} >
                <h3
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
                Add Card 
            </h3>
            </Link>
              </div>
              <div>
                {!cards?.length ? (
                  <div style={{textAlign : "center"}}>
                     Your cards will show here
                 </div>
                ) : (
                     <table>
                         <thead>
                             <tr>
                                <td colSpan={2}>Card Details</td>
                             </tr>
                         </thead>
                            {
                               cards?.map((person, index) => 
                               (
                                <tbody  key={index} className='main-row'>
                                  <tr>
                                   
                                    <td>  {index + 1}. Card Name</td>
                                    <td>{person?.nameOnCard}<span onClick={()=> {localStorage.setItem("card", JSON.stringify(person)); navigate("/myaccount/make-payment")}} style={{float : "right", cursor : "pointer", border : "1px solid white", color : "rgb(253,145,22)", borderRadius : "5px", fontSize : "0.85rem"}}>Use card</span></td>
                                    
                                  </tr>
                                  <tr>
                                    <td>Number on card</td>
                                    <td>{person?.cardNumber}</td>
                                  </tr>
                                  <tr>
                                    <td>Bank Code</td>
                                    <td>{person?.bankCode}</td>
                                  </tr>
                                </tbody>
                              )
                            )
                          
                          }
                     </table>
                )
               }  
              </div>
              </Section>
    )
}

export default AllCards;



const Section = styled.section`
  ${cardStyles};
  position : relative;
  display: flex;
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
    width :100%;
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
