import React, {useState, useEffect, useRef} from 'react';
import {Link, useLocation} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Button from '../Button/Button';
import bgPic from "../../images/bgPic.jpg";
import bgPic2 from "../../images/bgPic2.jpg";
import bgPic3 from "../../images/bgPic3.jpg";
import logo from "../../images/logo.png";
import "./styles.css";

const Home = () => {
    localStorage.removeItem("beneficiary");
    const isFirst= 1;
    const isSecond = 2;
    const isThird = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const location = useLocation();
    const dotRef = useRef();
    const [sideStartX, setSideStartX] = useState(0);
    const [sideStartY, setSideStartY] = useState(0);
    const [sideEndX, setSideEndX] = useState(0);
    const [sideEndY, setSideEndY] = useState(0);
    const cookie = new Cookies();
    const token = cookie.get("Auth_token", {path: '/myaccount'});
    const handleFirst = () => {setCurrentPage(isFirst)};
    const handleSecond = () => { setCurrentPage(isSecond)};
    const handleThird = () => { setCurrentPage(isThird)};
    const handleTouchStart = (e) => {
        setSideStartX(e.touches[0].clientX);
        setSideStartY(e.touches[0].clientY);
    }
    const handleTouchMove = (e)=> {
        setSideEndX(e.touches[0].clientX);
        setSideEndY(e.touches[0].clientY);
     
        if (Math.sign(sideEndX - sideStartX) > 0 &&  Math.abs(sideStartX - sideEndX) > 30 && Math.floor(Math.abs(sideEndY - sideStartY)) < 10 ){
             if ( currentPage > 1){
                setCurrentPage(currentPage - 1);
            }else if (currentPage === 1) {
                setCurrentPage(isThird)
            }
         
        } else if (Math.sign(sideEndX - sideStartX) < 0 && Math.abs(sideEndX - sideStartX) > 30 && Math.floor(Math.abs(sideEndY - sideStartY)) < 10) {
            if (currentPage === 3) {
                setCurrentPage(isFirst);
            } else {
                setCurrentPage(currentPage + 1);
            }
        }

    }

 
    useEffect(() => {
        dotRef.current.childNodes.forEach(dot => {
            dot.classList.remove("currentPage")});
        if (currentPage === isFirst) {
            dotRef.current.children[0].classList.add("currentPage");
        } else if (currentPage === isSecond) {
            dotRef.current.children[1].classList.add("currentPage");
        } else if (currentPage === isThird) {
            dotRef.current.children[2].classList.add("currentPage");
        }
        if (location.pathname === "/") {
            window.scrollTo(0, 0);
        }
        if (!localStorage.getItem("user")){
            localStorage.clear();
        }
    },[currentPage, location.pathname]);

    return (
        <div className='home-container' onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
            <div className="logo-container">
               <Link to="/">
                 <img src={logo} alt="logo" className="logo"/>
                </Link>
            </div>
            {
                currentPage === isFirst && (
                <div className='home-title-wrap'>
                        <div className='home-title' >
                            <h1>Welcome to Aaeon Tech <br/> <small className='bg-small1'>Your global financial partner</small> <br />
                            <Link to={token !== undefined ? "/myaccount/dashboard" : "/auth"}> <Button primary="primary" medium={`medium`} text="Use Platform"/> </Link>
                            </h1>
                            <div className="wave">
                                <div className='background'>
                                    <img src={bgPic} alt="background" />
                                </div> 
                                <div className='wave__1'></div>
                                <div className='wave__2'></div>
                                <div className='wave__3'></div>
                                <div className='wave__4'></div>
                            </div>
                        </div>
                    <div className='dots' ref={dotRef}>
                        <span className="dot" onClick={handleFirst}></span>
                        <span className="dot" onClick={handleSecond}></span>
                        <span className="dot" onClick={handleThird}></span>
                    </div>
                </div>
            )
            }
            {
                currentPage === isSecond && (
                <div className='home-title-wrap'>
                 <div className='home-title'>
                    <h1 className='second-heading'>Have you finished your search? <br/> <small className='bg-small2'>We are the ultimate</small> <br />
                    <Link to={token !== undefined ? "/myaccount/dashboard" : "/auth"}><Button tertiary="tertiary" medium={`medium`} text="Use Platform"/></Link> 
                    </h1>
                    <div className="wave">
                        <div className='background'>
                            <img src={bgPic2} alt="background" />
                        </div> 
                        <div className='wave__1'></div>
                        <div className='wave__2'></div>
                        <div className='wave__3'></div>
                        <div className='wave__4'></div>
                    </div>
                 </div>
                 <div className='dots' ref={dotRef}>
                    <span className="dot" onClick={handleFirst}></span>
                    <span className="dot" onClick={handleSecond}></span>
                    <span className="dot" onClick={handleThird}></span>
                 </div>
                 </div>
                 )
            }
            {
                currentPage === isThird && 
                (<div className='home-title-wrap'>
                <div className='home-title'>
                    <h1 className='third-heading'>Your journey Begins Now <br/> <small className='bg-small3'>we are the destination</small> <br />
                    <Link to={token !== undefined ? "/myaccount/dashboard" : "/auth"}> <Button primary="primary" medium={`medium`} text="Use Platform"/> </Link>
                    </h1>
                    <div className="wave">
                        <div className='background'>
                            <img src={bgPic3} alt="background" />
                        </div> 
                        <div className='wave__1'></div>
                        <div className='wave__2'></div>
                        <div className='wave__3'></div>
                        <div className='wave__4'></div>
                    </div>
                </div>
                <div className='dots' ref={dotRef}>
                <span className="dot" onClick={handleFirst}></span>
                <span className="dot" onClick={handleSecond}></span>
                <span className="dot" onClick={handleThird}></span>
            </div>
                </div>
                )
            }
           
        </div>
    )
}

export default Home
