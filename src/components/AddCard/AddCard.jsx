import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom";
import Button from "../Button/Button";
import Navbar from "../NavBar/NavBar";
import { addCard, getBanks } from "../../actions/user";
import Response2 from "../Response2";
import "./styles.css";
const AddCard = () => {
  localStorage.removeItem("beneficiary");
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth() + 1;
  const [isResponse, setIsResponse] = useState(false);
  const dispatch = useDispatch();
  const [isTimeOut, setIsTimeOut] = useState(240);
  const banks = useSelector((state) => state.banks);
  const [cardDetails, setCardDetails] = useState({
    userID: "",

    bankCode: "",

    accountNumber: "",

    nameOnCard: "",

    cardNumber: 5555,

    expiration: { year: 2000, month: 0 },

    cvv: 1,
  });
 
  const handleSubmit = (e) => {
     e.preventDefault();
    if (
      cardDetails.bankCode === "" ||
      cardDetails.accountNumber === "" ||
      cardDetails.nameOnCard === "" ||
      cardDetails.cardNumber === 5555 ||
      cardDetails.expiration.year === 2000 ||
      cardDetails.expiration.month === 1 ||
      cardDetails.cvv === 1
    ) {
      alert("You cannot leave any field empty");
    }else if (cardDetails.accountNumber.length < 9 || cardDetails.accountNumber.length > 18) {
      alert("Account number must be 9 or more digits but less than 18");
   }
   else if (cardDetails.cardNumber.length < 13 || cardDetails.cardNumber.length > 19) {
    alert("card number must be between 13 and 19 digits");
 }
     else if (cardDetails.expiration.year.toString().length < 4 || cardDetails.expiration.year.toString().length > 4) {
       alert("expiration year must be exactly four digits");
    }else if (cardDetails.expiration.year.toString().length === 4 && Number(cardDetails.expiration.year) < currentYear) {
      alert("Your cannot add an expired card!");
   }
   else if ( Number(cardDetails.expiration.year) === currentYear && Number(cardDetails.expiration.month) < currentMonth) {
    alert("Your cannot add an expired card!");
   }
    else if (cardDetails.expiration.month.toString().length < 2 || cardDetails.expiration.month.toString().length > 4) {
      alert("expiration month must be exactly two digits");
   }else if (cardDetails.cvv.toString().length < 3 || cardDetails.cvv.toString().length > 3) {
    alert("cvv must be exactly 3 digits");
 }
    else {
      setIsResponse(true);
      e.preventDefault();
      if (isTimeOut === 240) {
        setTimeout(() => {
          dispatch(addCard(cardDetails));
        }, isTimeOut);
        setIsTimeOut(isTimeOut - 1);
      } // debounce measure
      
    }
  };
  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);
  return (
    <>
      {isResponse && (
        <Response2
          pathname="/myaccount/add-card"
          onClick={() => {
            setIsResponse(false);
            setIsTimeOut(240);
          }}
          action="New Card"
        />
      )}
      <div className="payment-container-wrap">
        <Navbar className="navBar1" />
        <Link to="/myaccount/all_cards">
        <div className="see-cards" >See Cards</div>
        </Link>
        <div className="payment-container">
          <div className="payment-grid">
            <div className="payment-card">
              <input
                list="bank_code"
                className="payment-input"
                placeholder="Bank Name"
                required
                style={{ color: "rgb(253,145,22)" }}
                onChange={(e) => {
                  const bank_code = banks?.filter(
                    (bank) => bank.name.toLowerCase() === e.target.value.toLowerCase()
                  )[0]?.code;
                  setCardDetails({
                    ...cardDetails,
                    userID: JSON.parse(localStorage.getItem("user"))._id,
                    bankCode: bank_code,
                  });
                }}
              />
              <datalist id="bank_code">
                {banks?.map((bank, index) => (
                  <option key={index} value={`${bank.name}`}>
                    {" "}
                    {bank.name}{" "}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="payment-card">
              <input
                type="text"
                className="payment-input"
                required
                placeholder="Account Number"
                onChange={(e) => {
                  setCardDetails({
                    ...cardDetails,
                    accountNumber: e.target.value,
                  });
                  setIsTimeOut(240);
                }}
              />
            </div>
            <div className="payment-card">
              <input
                type="text"
                className="payment-input"
                required
                placeholder="Name on card or Account Name"
                onChange={(e) => {
                  setCardDetails({
                    ...cardDetails,
                    nameOnCard: e.target.value,
                  });
                  setIsTimeOut(240);
                }}
              />
            </div>
            <div className="payment-card">
              <input
                type="number"
                className="payment-input"
                min="1"
                required
                placeholder="Number on card"
                onChange={(e) => {
                  e.target.value >= 1 &&
                    setCardDetails({
                      ...cardDetails,
                      cardNumber: e.target.value,
                    });
                  setIsTimeOut(240);
                }}
              />
            </div>
            <div className="payment-card">
              <input
                type="number"
                className="payment-input"
                min="1"
                max="9999"
                required
                placeholder="2001"
                onChange={(e) => {
                  e.target.value >= 1 &&
                    setCardDetails({
                      ...cardDetails,
                      expiration: {
                        ...cardDetails.expiration,
                        year: e.target.value,
                      },
                    });
                  setIsTimeOut(240);
                }}
              />
              <input
                type="number"
                className="payment-input"
                min="0"
                max = "99"
                required
                placeholder="03"
                onChange={(e) => {
             
                  e.target.value >= 1 &&
                    setCardDetails({
                      ...cardDetails,
                      expiration: {
                        ...cardDetails.expiration,
                        month: e.target.value,
                      },
                    });
                   
                  setIsTimeOut(240);
                }}
              />
            </div>
            <div className="payment-card">
              <input
                type="number"
                className="payment-input"
                min="1"
                required
                placeholder="CVV"
                onChange={(e) => {
                  e.target.value >= 1 &&
                    setCardDetails({ ...cardDetails, cvv: e.target.value });
                  setIsTimeOut(240);
                }}
              />
            </div>
          </div>
        </div>
        <div className="card-btn"
          style={{
            textAlign: "center",
            width: "75%",
            margin: "auto",
            transform: "translateY(50px)",
          }}
        >
          <Button
            secondary="secondary"
            fullWidth="fullWidth"
            text="Add Card"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default AddCard;
