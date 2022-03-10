import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../NavBar/NavBar";
import Button from "../Button/Button";
import { getAllUsers, makePayment } from "../../actions/user";
import Response from "../Response";
import "./styles.css";
import setCommas from "../../ReusableFunctions/setCommas";

const Payment = () => {
  const dispatch = useDispatch();
  const [isResponse, setIsResponse] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(240);
  const allUsers = useSelector((state) => state.allUsers);
  const sender_id = JSON.parse(localStorage.getItem("user"))?._id?.slice(18,25);
  const sender_email = JSON.parse(localStorage.getItem("user"))?.email;
  const receiver_id = JSON.parse(localStorage.getItem("beneficiary"))?._id?.slice(18,25);
  const receiver_email = JSON.parse(localStorage.getItem("beneficiary"))?.email;
  const [paymentDetails, setPaymentDetails] = useState({
    senderEmail: "",
    senderId: "",
    receiverEmail: "",
    receiverId: "",
    amount: 0,
    senderPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (
      paymentDetails.receiverEmail === "" ||
      paymentDetails.receiverId === "" ||
      paymentDetails.senderPassword === ""
    ) {
      alert("You cannot leave any field empty!.");
    } else if (paymentDetails.amount <= 0) {
      alert("amount cannot be zero");
    } else {
      setIsResponse(true);
      if (paymentDetails.senderEmail === paymentDetails.receiverEmail) {
        alert(
          "Your cannot send money to yourself directly from your aaeon wallet."
        );
      } else {
        if (isTimeOut === 240) {
          setTimeout(() => {
            dispatch(makePayment(paymentDetails));
          }, isTimeOut);
          setIsTimeOut(isTimeOut - 1);
        } // debounce measure
      }
    }
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch, isTimeOut]);

  return (
    <>
      {isResponse && (
        <Response
          action = {"New Payment"}
          pathname="/myaccount/make-payment"
          onClick={() => {
            localStorage.removeItem("beneficiary");
            setIsTimeOut(240);
            setIsResponse(false);
          }}
        />
      )}
      <div className="payment-container-wrap">
        <Navbar />
        <div className="payment-container">
          <div className="payment-grid">
            {
              !localStorage.getItem("beneficiary") && <div className="payment-card">
              <input 
                list = "receiver_email"
                className="payment-input"
                placeholder="Receiver's Email"
                style={{ color: "rgb(253,145,22)" }}
                onChange={(e) => {
                  setPaymentDetails({
                    ...paymentDetails,
                    senderEmail: JSON.parse(localStorage.getItem("user"))
                      ?.email,
                    receiverEmail:
                      e.target.value,
                  });
                  setIsTimeOut(240);
                }}

              />
            </div>
            }
            {
              !localStorage.getItem("beneficiary") && <div className="payment-card">
              <input
                className="payment-input"
                placeholder="Receiver's Name"
                style={{ color: "rgb(253,145,22)" }}
                onChange={(e) => {
                  const receiver_id = allUsers?.filter((user) => user.fullName.toLowerCase() === e.target.value.toLowerCase())[0]?._id.slice(18,25);
                  
                  setPaymentDetails({
                    ...paymentDetails,
                    senderId: JSON.parse(localStorage.getItem("user"))?._id.slice(18,25),
                    receiverId: receiver_id,
                  });
                  setIsTimeOut(240);
                }}
              />
             
            </div>
            }
            
            <div className="payment-card">
              <input
                type="number"
                className="payment-input"
                required
                placeholder="Enter Amount"
                onChange={(e) => {
                  
                  if (e.target.value?.toString()?.length >= 11) {
                    alert("You have exceeded the maximum allowed amount.");
                    e.target.value = Number(e.target.value?.toString()?.slice(0,11));
                    return;
                  }else {
                  const money = e.target.value;
                    setPaymentDetails({
                      ...paymentDetails,
                      amount: money,
                      senderId: sender_id,
                      senderEmail: sender_email,
                      receiverEmail : `${!receiver_email ? paymentDetails.receiverEmail : receiver_email}`,
                      receiverId : `${!receiver_id ? paymentDetails.receiverId : receiver_id}`
                      
                    });
                  //   if (localStorage.getItem("beneficiary")) {
                  //     setPaymentDetails({...paymentDetails, receiverEmail : JSON.parse(localStorage.getItem("beneficiary")).email, receiverId : JSON.parse(localStorage.getItem("beneficiary"))._id.slice(18,25)})
                  //  }
                   
                  setIsTimeOut(240);
                  }
                }}
              />
            </div>
            <div className="payment-card">
              <input
                type="password"
                className="payment-input"
                required
                placeholder="Your aaeon password"
                onChange={(e) => {
                  if (localStorage.getItem("user")) {
                     setPaymentDetails({
                    ...paymentDetails,
                    senderPassword: e.target.value,
                    senderEmail : sender_email,
                    senderId : sender_id
                  });
                  }
                 
                //   if (localStorage.getItem("beneficiary")) {
                //     setPaymentDetails({...paymentDetails, receiverEmail : JSON.parse(localStorage.getItem("beneficiary")).email, receiverId : JSON.parse(localStorage.getItem("beneficiary"))._id.slice(18,25)})
                //  }
              
                  setIsTimeOut(240);
                }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            transform: "translateX(0.2vw)",
            width: "72%",
            margin: "auto",
          }}
        >
          <Button
            secondary="secondary"
            fullWidth="fullWidth"
            text="Pay 💸"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default Payment;
