import React, { useState, useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useParams,Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdSpaceDashboard } from "react-icons/md";
import { FaAddressCard} from "react-icons/fa";
import {AiFillHome} from "react-icons/ai";
import { BsFillChatTextFill } from "react-icons/bs";
import { BsFillCreditCard2BackFill } from "react-icons/bs";
import { IoSettings } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import {BsPeopleFill} from "react-icons/bs";
import scrollreveal from "scrollreveal";
import logo from "../images/logo.png";
import { logout } from "../actions/user";
import Loading from "./Loading";
import { CLEAR_USER } from "../constants/actionTypes";


export default function Sidebar() {
  const [currentLink, setCurrentLink] = useState(1);
  const [navbarState, setNavbarState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const logoutStatus = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {name} = useParams();

  
  const handleLogout = () => {
    setCurrentLink(7)
    setIsLoading(true);
    dispatch(logout());
  }

  useEffect(() => {
    window.addEventListener("click", () => setNavbarState(false));

    const sr = scrollreveal({
      origin: "left",
      distance: "80px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(
      `
          .brand,
          .links>ul>li:nth-of-type(1),
      .links>ul>li:nth-of-type(2),
      .links>ul>li:nth-of-type(3),
      .links>ul>li:nth-of-type(4),
      .links>ul>li:nth-of-type(5),
      .links>ul>li:nth-of-type(6)
      `,
      {
        opacity: 0,
        interval: 300,
      }
    );

    name === "dashboard" && setCurrentLink(1);
    name === "beneficiaries" && setCurrentLink(2)
    name === "make-payment" && setCurrentLink(3)
    name === "add-card" && setCurrentLink(4)
    name === "faqs" && setCurrentLink(5)
    name === "settings" && setCurrentLink(6)
    
   if (logoutStatus[0]?.message === "logout successful"){
      navigate("/");
     dispatch({type : CLEAR_USER});
   }
  }, [name, logoutStatus]);

  return (
    <>
      {
        isLoading && <Loading />
      }
      
      <Section>
        <div className="top">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="brand">
            <div className="home"><Link to="/" ><AiFillHome /></Link></div>
            <span style={{marginLeft : "10px", fontWeight : "bold"}}>My Account</span>
          </div>
          <div className="toggle">
            {navbarState ? (
              <VscChromeClose style={{cursor : "pointer"}} onClick={() => setNavbarState(false)} />
            ) : (
              <GiHamburgerMenu
                onClick={(e) => {
                  e.stopPropagation();
                  setNavbarState(true);
                }}
                style={{cursor : "pointer"}}
              />
            )}
          </div>
          <div className="links">
            <ul>
              <li
                className={currentLink === 1 ? "active" : "none"}
                
              >
                <Link to="/myaccount/dashboard" className="a">
                  <MdSpaceDashboard />
                  <span onClick={() => setCurrentLink(1)}> 
                    Dashboard
                  </span>
                  </Link>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                
              >
                <Link to ="/myaccount/beneficiaries" className="a">
                  <BsPeopleFill />
                  <span onClick={() => setCurrentLink(2)}> 
                    Beneficiaries
                  </span>
                  </Link>
              </li>
              <li
                className={currentLink === 3 ? "active" : "none"}
                
              >
                <Link to="/myaccount/make-payment" className="a">
                  <FaAddressCard />
                  <span onClick={() => setCurrentLink(3)}>
                    Make Payment
                  </span>
                  </Link>
              </li>
              <li
                className={currentLink === 4 ? "active" : "none"}
                
              >
                <Link to="/myaccount/add-card" className="a"> 
                  <BsFillCreditCard2BackFill />
                  <span onClick={() => setCurrentLink(4)}> 
                     Add New Card
                  </span>
                 </Link>
              </li>
              <li
                className={currentLink === 5 ? "active" : "none"}
                
              >
                <Link to="/myaccount/settings" className="a">
                  <IoSettings />
                  <span onClick={() => setCurrentLink(5)}>
                    Settings
                  </span>
                  </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout">
          <div className="a" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </div>
        </div>
      </Section>
      <ResponsiveNav className={navbarState ? "test-show" : ""}>
        <div className="responsive__links">
        <ul>
              <li
                className={currentLink === 1 ? "active" : "none"}
                onClick={() => setCurrentLink(1)}
              >
                <Link to="/myaccount/dashboard" className="a">
                  <MdSpaceDashboard/>
                  <span> 
                    Dashboard
                  </span>
                  </Link>
              </li>
              <li
                className={currentLink === 2 ? "active" : "none"}
                onClick={() => setCurrentLink(2)}
              >
                <Link to ="/myaccount/beneficiaries" className="a">
                  <BsPeopleFill />
                  <span> 
                    Beneficiaries
                  </span>
                  </Link>
              </li>
              <li
                className={currentLink === 3 ? "active" : "none"}
                onClick={() => setCurrentLink(3)}
              >
                <Link to="/myaccount/make-payment" className="a">
                  <FaAddressCard />
                  <span>
                    Make Payment
                  </span>
                  </Link>
              </li>
              <li
                className={currentLink === 4 ? "active" : "none"}
                onClick={() => setCurrentLink(4)}
              >
                <Link to="/myaccount/add-card" className="a"> 
                  <BsFillCreditCard2BackFill />
                  <span> 
                     Add New Card
                  </span>
                 </Link>
              </li>
              <li
                className={currentLink === 5 ? "active" : "none"}
                onClick={() => setCurrentLink(5)}
              >
                <Link to="/myaccount/settings" className="a">
                  <IoSettings />
                  <span>
                    Settings
                  </span>
                  </Link>
              </li>
              <li style={{color : "white"}} className={currentLink === 7 ? "active" : "none"} onClick={handleLogout}>
                 <FiLogOut />
                <span>Logout</span>
              </li>
            </ul>
        </div>
      </ResponsiveNav>
    </>
  );
}
const Section = styled.section`
  position: fixed;
  left: 0;
  background-color: #212121;
  height: 100vh;
  width: 18vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  gap: 5rem;


  .top {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    .logo {
      width : 100vw;
      height: fit-content;
      text-align: center;
      display : grid;
      place-items: center;
      position : absolute;
      top : 0px;
      img {
        width : 80px;
        height: 80px;
       
      }
      @media screen and (max-width: 463px) {
        place-items: start;
        position : relative;
        img {
          width : 70px;
          height: 70px;
        }

      }
    }
    .toggle {
      display: none;
    }
    .brand {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      svg {
        color: blue;
        font-size: 2rem;
      }
      .home {
        position: fixed;
        top : -20px;
        width : 100%;
        height: fit-content;
        text-align: center;
        svg {
          font-size: 1.5rem;
          color: rgb(253, 145,22);
        }

        @media screen and (min-width: 230px) and (max-width: 1080px){
          display: none;
        }
      }
      span {
        font-size: 2rem;
        color: blue;
        font-family: 'Oswald', sans-serif;
      }
      @media screen and (max-width: 463px) {
        display: none;
      }
    }
    .links {
      display: flex;
      justify-content: center;
      ul {
        list-style-type: none;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        li {
          padding: 0.6rem 1rem;
          border-radius: 0.6rem;
          &:hover {
            background-color: rgb(253, 145, 22);
            span {
              color: blue;
            }
          }
          .a {
            text-decoration: none;
            display: flex;
            gap: 1rem;
            color: white;
          }
        }
        .active {
          background-color: rgb(253, 145, 22);
          .a {
            color: blue;
          }
        }
      }
    }
  }

  .logout {
    display : flex;
    padding: 0.3rem 1rem;
    border-radius: 0.6rem;
    cursor : pointer;
    &:hover {
      background-color: #da0037;
    }
    span {
      margin-left : 10px
    }
    .a {
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      color: white;
    }
  }
  @media screen and (min-width: 250px) and (max-width: 1080px) {
    position: initial;
    width: 100%;
    height: max-content;
    padding: 1rem;
    .top {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 0;
      .toggle {
        display: block;
        color: white;
        z-index: 99;
        svg {
          font-size: 1.4rem;
        }
      }
      .brand {
        gap: 1rem;
        justify-content: flex-start;
      }
    }
    .top > .links,
    .logout {
      display: none;
    }
  }
`;

const ResponsiveNav = styled.div`
  position: fixed;
  right: 0;
  left : 0;
  top: 0;
  z-index: 10;
  background-color: black;
  height: 100vh;
  width : 0px;
  transition: 0.4s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: stretch;
  opacity: 0;
  visibility: hidden;
  padding: 1rem;
  &.test-show {
    opacity : 1;
    right : 0;
    visibility: visible;
    width : 100%;
  }
  .responsive__links {
    ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: center;
      gap: 2.2rem;
      height : 100%;
      margin : 2rem 0;
      li {
        padding: 0.6rem 1rem;
        border-radius: 0.6rem;
        height : 14%;
        &:hover {
          background-color: rgb(253, 145, 22);
          .a {
            color: black;
          }
        }
        .a {
          text-decoration: none;
          display: flex;
          gap: 1rem;
          color: white;
        }
      }
      .active {
        background-color: rgb(253, 145, 22);
        .a {
          color: black;
        }
      }
    }
  }
`;