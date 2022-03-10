import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {getCards, deleteCard, changePassword, deleteAccount} from "../../actions/user";
import NavBar from "../NavBar/NavBar";
import Button from "../Button/Button";
import {MdPassword} from "react-icons/md";
import {BsFillCreditCardFill} from "react-icons/bs";
import {ImBin} from "react-icons/im";
import Response4 from '../Response4';
import { REMOVE_RESPONSE } from '../../constants/actionTypes';
import "./styles.css";
const Settings = () => {
    const cards = useSelector(state => state.card);
    const settings = useSelector(state => state.settings);
    const navigate = useNavigate();
   
    const passwordRef= useRef();
    const confirmRef = useRef();
    const [isResponse4, setIsResponse4] = useState(false);
    const [isDeleteCard, setIsDeleteCard] = useState(false);
    const [isChangePassword, setIsChangePassword] = useState(false);
    const [isDeleteAccount, setIsDeleteAccount] = useState(false); 
    const [isDeletePass , setIsDeletePass] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(240);
    const [deleteDetails, setIsDeleteDetails] = useState({_id : "",email : "", password : ""});
    const [password, setPassword] = useState({userEmail : "", oldPassword : "", newPassword : ""})
    const dispatch = useDispatch();
    const id = JSON.parse(localStorage.getItem("user"))?._id;
   
   

    const handlePasswordChange = () => {
       if (password.oldPassword === "" || password.newPassword === "" || confirmRef.current.value === "") {
           alert("You cannot leave any field empty!")
       }
      else if (passwordRef.current.value !== confirmRef.current.value ) {
           alert("passwords do not match")
       }else {
           setIsResponse4(true)
           if (isTimeOut === 240) {
            setTimeout(() => {
                dispatch(changePassword(password));
            }, isTimeOut);
            setIsTimeOut(isTimeOut - 1);
          } // debounce measure
       }
    }



    useEffect(() => {
        if (settings?.message === "Account deleted") {
            navigate("/")
            localStorage.clear();
            dispatch({type : REMOVE_RESPONSE, payload : {}})
        }
        dispatch(getCards(id))
    }, [dispatch, settings]);

    return (
        <>
        <div className='navBar'>
            <NavBar />
        </div>
        <div className="settings">
                <h1>Settings</h1>
            <div className="settings__types">
                <span onClick={() => setIsChangePassword(!isChangePassword)}> Change Password</span><span style={{float : "right", display : "inline-block"}} onClick={() => setIsChangePassword(!isChangePassword)}><MdPassword /></span>
                {
                    isChangePassword && (
                        <>
                         <div><input type="password"  placeholder='Old password' onChange={(e) => {setPassword({...password, userEmail : JSON.parse(localStorage.getItem("user"))?.email, oldPassword : e.target.value})}}/></div>
                         <div><input ref={passwordRef} type="password" placeholder='New password' onChange={(e)=> {setPassword({...password, newPassword : e.target.value})}}/></div>
                         <div><input ref= {confirmRef} type="password" placeholder='Confirm password'/></div>
                         <Button primary={`primary`} medium={`medium`} text="Change" onClick={handlePasswordChange} />
                        </>
                    )
                }
            </div>
            <div className="settings__types">
                <span onClick={() => setIsDeleteCard(!isDeleteCard)}> Delete Card</span><span onClick={() => setIsDeleteCard(!isDeleteCard)} style={{float : "right", display : "inline-block"}}><BsFillCreditCardFill /></span>
                {
                    isDeleteCard && (
                        <div>
                            <table>
                         <thead>
                             <tr>
                                <td colSpan={2}>Card Details</td>
                             </tr>
                         </thead>
                            {
                              cards && cards?.map((person, index) => 
                               (
                                <tbody  key={index} className='main-row'>
                                  <tr>
                                   
                                    <td>  {index + 1}. Card Name</td>
                                    <td>{person?.nameOnCard}<span onClick={() => {
                                        setIsResponse4(true);
                                        if (isTimeOut === 240) {
                                            setTimeout(() => {
                                                dispatch(deleteCard(person?._id))
                                            }, isTimeOut);
                                            setIsTimeOut(isTimeOut - 1);
                                          } // debounce measure
                                        }} 
                                        style={{float : "right", cursor : "pointer", border : "2px solid red", color : "rgb(253,145,22)", borderRadius : "5px", width : "max-content", fontSize : "0.75rem", padding : "0.2rem"}}>Delete</span></td>
                                    
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
                </div>
                    )
                }
            </div>
            <div className="settings__types">
                <span style={{border : "2px solid red"}} onClick={() => setIsDeleteAccount(!isDeleteAccount)} > Delete Account</span> <span style={{float : "right", display : "inline-block"}} onClick={() => setIsDeleteAccount(!isDeleteAccount)}><ImBin /></span>
                {
                    isDeleteAccount && (
                        <div>
                            {
                              isDeletePass &&  <input type="password" placeholder='Enter Password' onChange={(e) => setIsDeleteDetails({...deleteDetails ,email : JSON.parse(localStorage.getItem("user"))?.email, password : e.target.value, _id : JSON.parse(localStorage.getItem("user"))?._id })} />
                            }
                            <div className='delete-btn-wrap'>
                            <button className='delete-btn' onClick={() => {
                                if (deleteDetails.password === "" ) {
                                    setIsDeletePass(true);
                                }else {
                                    if (isTimeOut === 240) {
                                        setTimeout(() => {
                                                setIsResponse4(true);
                                                dispatch(deleteAccount(deleteDetails));
                                                setIsTimeOut(240);
                                        }, isTimeOut);
                                        setIsTimeOut(isTimeOut - 1);
                                      } // debounce measure
                                }
                                  
                            }}>Delete Account</button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        {isResponse4 && (
        <Response4
          action = {"More changes"}
          pathname="/myaccount/settings"
          onClick={() => {
            setIsResponse4(false);
            setIsTimeOut(240);
          }}
        />
      )}
        </>
    )
}

export default Settings
