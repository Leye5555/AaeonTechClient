import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import News from './News';
import Transfers from './Transfers';
import Earnings from './Earnings';
import Analytics from './Analytics';
import Navbar from '../NavBar/NavBar';
import scrollreveal from "scrollreveal";
import "./styles.css";
const Dashboard = () => {
  localStorage.removeItem("beneficiary");
  
    useEffect(() => {
        const sr = scrollreveal({
          origin: "bottom",
          distance: "80px",
          duration: 2000,
          reset: false,
        });
        sr.reveal(
          ` .row__one,
            ${window.matchMedia("(min-width : 1080px)").matches && ".row__two"}
        `,
          {
            opacity: 0,
            interval: 100,
          }
        );
      }, []);
    return (
          <Section>
            <Navbar />
            <div className="grid">
                <div className="row__one">
                <Analytics />
                <News />
                </div>
                <div className="row__two">
                <Transfers />
                <Earnings />
                </div>
            </div>
        </Section>

    )
}

export default Dashboard;


const Section = styled.section`
  margin-left: 18vw;
  padding: 2rem;
  height: 100%;
  .grid {
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 1rem;
    margin-top: 2rem;
    .row__one {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      height: 50%;
      gap: 1rem;
    }
    .row__two {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      height: 50%;
    }
  }
  @media screen and (min-width: 230px) and (max-width: 1080px) {
    margin-left: 0;
    .grid {
      .row__one,
      .row__two {
        grid-template-columns: 1fr;
      }
    }
  }
`; 
