import React,{useRef, useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';
import {Link} from "react-router-dom";
import { newUser, loginUser } from '../../actions/user.js';
import Cookies from "universal-cookie";
import Button from '../Button/Button';
import {BsEyeSlashFill, BsEyeFill} from "react-icons/bs";
import Loading from '../Loading.jsx';
import ErrorMessage from "../errorMessage/ErrorMessage";
import logo from "../../images/logo.png";
import "./styles.css";
import { CLEAR_ERROR } from '../../constants/actionTypes.js';

const Auth = () => {
    const userData= useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const passwordRef = useRef();
    const dispatch = useDispatch();
    const confirmRef = useRef();
    const [userDetails, setUserDetails] = useState({fullName : "", email : "", password : ""});
    const [isUser, setIsUser] = useState(true);
    const [signInToggle, setSignInToggle] = useState("sign-active");
    const [signUpToggle, setSignUpToggle] = useState("");
    const [seePassword, setSeePassword] = useState(false);
    const [seePasswordConfirm, setSeePasswordConfirm] = useState(false);
    const cookie = new Cookies();
    const token = cookie.get("Auth_token");
    const userID = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"))?._id;
    const  [isTimeOut, setIsTimeOut] = useState(240);
    
    const handleSignUp = (e) => {
        confirmRef.current.value === passwordRef.current.value && setIsLoading(true);
        e.preventDefault();
        e.stopPropagation()
       
        
       
        if (userDetails.fullName === "" || userDetails.email === ""  || userDetails.password === "") {
            alert("You cannot leave any field empty!");
        }
        else if (confirmRef.current.value !== passwordRef.current.value) { 
                alert("passwords do not match");
                return;
            }
        else if (isTimeOut === 240) {setTimeout(() => {dispatch(newUser(userDetails))}, isTimeOut); setIsTimeOut(isTimeOut - 1);}; // debounce measure
        
      
    }

    const handleLogin = (e) => {
        e.preventDefault();
        e.stopPropagation();
       
        if (userDetails.email === "" || userDetails.password === "") {
            alert("You cannot leave any field empty");
        } else {
             setIsLoading(true);
            let loginDetails = userDetails;
            delete loginDetails.fullName;
            delete loginDetails.phoneNumber;
            if (isTimeOut === 240) {setTimeout(() => { dispatch(loginUser(loginDetails))}, isTimeOut); setIsTimeOut(isTimeOut - 1)}; // debounce measure
        }
      
    }
    
    useEffect(() => {
        (token !== undefined && userID) && navigate("/myaccount/dashboard");
        if (userData.message || userData.user) {
            setIsLoading(false)
        }
    } , [userData]);
    return (
        <>
           {
               userData?.message && <ErrorMessage pathname={location?.pathname} onClick={() => {setIsTimeOut(240);  dispatch({type : CLEAR_ERROR, payload : {}})}} />
           }
           {
                (isLoading && !userData?.message) && <Loading /> 
            }
        <div className="auth-container">
         
            <header>
                <Link to="/" className='home-link'>
                    <div className='logo-container-auth'>
                        <img src={logo} alt='logo' /> 
                    </div> 
                </Link>   
            </header>
            <div className="auth-form-wrap" >
                <div className='sign-in-toggle'>
                   <button className={`btn-sign ${signUpToggle}`} onClick={() => { signUpToggle === "" && setSignInToggle(""); signUpToggle === "" &&  setSignUpToggle("sign-active"); signInToggle === "sign-active" && setIsUser(null);}}>SIGN UP</button>
                   <button className={`btn-sign ${signInToggle}`} onClick={() => {signInToggle === "" &&  setSignInToggle("sign-active"); setSignUpToggle(""); setIsUser(true);}}>SIGN IN</button>
                </div>
                <form className='form-group' method = "POST"> 
                    <div>
                    {
                    !isUser && (
                    <div>
                        <input type="text" id="input-fullname" name="fullName" required onChange= {(e) => {setUserDetails({...userDetails, fullName : e.target.value}); e.target.style.backgroundColor = "white"; setIsTimeOut(240)}}/>
                        <label htmlFor='name' id="name">
                        </label>
                    </div>
                    ) }
                    </div> 
                    <div>
                      <input type="email" name="email" id='input-email' required onChange= {(e) => {setUserDetails({...userDetails, email : e.target.value}); e.target.style.backgroundColor = "white"; setIsTimeOut(240)}} />
                      <label htmlFor='email' id='email'></label>
                    </div>
               
             
                   
                    <div>
                       <input type={seePassword ? "text" : "password"} id="input-password" name="password" autoComplete='off' ref={passwordRef} required onChange= {(e) => {setUserDetails({...userDetails, password : e.target.value}); e.target.style.backgroundColor = "white"; setIsTimeOut(240)}} />
                       <label htmlFor="password" id="password"></label>
                       <label className = "show-pass"  onClick={() => setSeePassword(!seePassword)}>{!seePassword ? <BsEyeSlashFill style={{transform : "translateY(-4px)"}} /> : <BsEyeFill style={{transform : "translateY(-4px)"}} /> }</label>
                    </div>
                        {
                            !isUser && ( 
                               <div>
                                   <input type={seePasswordConfirm ? "text" : "password"} id='input-confirm-pass' autoComplete='off' ref={confirmRef} required  onChange={(e) => {e.target.style.backgroundColor = "white"; setIsTimeOut(240)}} />
                                    <label htmlFor='password' id='confirm-pass'></label>
                                    <label className = "show-pass" type={seePasswordConfirm ? "text" : "password"} onClick={() => setSeePasswordConfirm(!seePasswordConfirm)}>{!seePasswordConfirm ? <BsEyeSlashFill style={{transform : "translateY(-4px)"}} /> : <BsEyeFill style={{transform : "translateY(-4px)"}} /> }</label>
                               </div>
                            )
                        }
                    <div className="submit-btn-wrap">
                        {
                            isUser ? <Button secondary="secondary" fullWidth="fullWidth" text="Sign In 🚀" onClick={handleLogin} />:  <Button secondary="secondary" text="Sign up 🚀" fullWidth="fullWidth" onClick={handleSignUp} /> 
                        
                            }                       
                    </div>
                </form>    
            </div>    
        </div>
        </>
    )
}

export default Auth;
