import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import { IoIosArrowForward } from "react-icons/io";
import {BsNewspaper} from "react-icons/bs";
import {getNews} from "../../actions/user";


export default function News() {
 const dispatch = useDispatch();
 const newsFeed = useSelector(state => state.news);
 let random = Math.random();
 if (random === 0 ) {
   random = 0.1;
 }

 useEffect(()=> {
   dispatch(getNews());
 }, [dispatch]);
  return (
    <Section>
      <div className="title">
        <h2 style={{fontSize : "1.2rem"}}>📈 Trending Right Now</h2>
      </div>
      <div className="news">
        { newsFeed?.length ? (
            <div className="new">
              <div className="info">
                <BsNewspaper />
                <h4><a style={{textDecoration : "none", color : "white", fontSize : "12px"}} href={`${newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -3)].url}`}>{newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -3)].title}</a> </h4>
              </div>
              <a style={{textDecoration : "none", color : "white"}} href={`${newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -3)].url}`}><IoIosArrowForward /></a>
            </div>
        ) : <span>Latest business news will show here.</span>
          
                
        }
             { newsFeed?.length ? (
            <div className="new">
              <div className="info">
                <BsNewspaper />
                <h4><a style={{textDecoration : "none", color : "white", fontSize : "12px"}} href={`${newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -2)].url}`}>{newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -2)].title}</a> </h4>
              </div>
              <a style={{textDecoration : "none", color : "white"}} href={`${newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -2)].url}`}><IoIosArrowForward /></a>
            </div>
        ) : ""
          
                
        }
             { newsFeed?.length ? (
            <div className="new">
              <div className="info">
                <BsNewspaper />
                <h4><a style={{textDecoration : "none", color : "white", fontSize : "12px"}} href={`${newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -1)].url}`}>{newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -1)].title}</a> </h4>
              </div>
              <a style={{textDecoration : "none", color : "white"}} href={`${newsFeed[Math.abs(Math.floor(random * newsFeed?.length) -1)].url}`}><IoIosArrowForward /></a>
            </div>
        ) : ""
          
                
        }
      </div>
    </Section>
  );
}
const Section = styled.section`
padding: 1rem 2rem 1rem 2rem;
border-radius: 1rem;
margin : 1.5rem 0;
font-size : 1rem;
background-color: #212121;
color: white;
  .title {
    h2 {
      color: rgb(253, 145, 22);
      font-family: 'Oswald', sans-serif;
      letter-spacing: 0.3rem;
    }
  }
  .news {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
    .new {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      .info {
        display: flex;
        gap: 1rem;
        align-items: center;
      }
      svg {
        font-size: 1.4rem;
        color : rgb(253,145, 22);
      }
      &:nth-of-type(2) {
        border-top: 0.01rem solid #6c6e6e;
        border-bottom: 0.01rem solid #6c6e6e;
        padding: 0.8rem 0;
      }
    }
  }
  @media screen and (min-width: 230px) and (max-width: 1080px) {
    svg {
      font-size: 2rem !important;
    }
  }
`;
