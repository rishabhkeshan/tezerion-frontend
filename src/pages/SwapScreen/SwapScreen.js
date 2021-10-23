import "./SwapScreen.scss";

import NextIcon from "../../assets/next.svg";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Redirect from "../../assets/Redirect.svg";

import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";

function SwapScreen() {
  const [projectDisplayID, setProjectDisplayID] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [projectOverviewData, setProjectOverviewData] = useState(null);
  const [allProjectData, setAllProjectData] = useState([]);
  const tokens=["XTZ","KALAM"];
  useEffect(() => {
    
  }, []);

  return (
    <>
      <article className="swapscreen">
        <Header />
        <section className="swapscreen_maincontainer">
          <div className="swapscreen_maincontainer_titlecontainer">
            <div className="swapscreen_maincontainer_titlecontainer_title">
              Swap Details
            </div>
            {/* <select
              className="swapscreen_maincontainer_titlecontainer_tokensdropdown"
              name="selectList"
              id="selectList"
              onChange={(event) => {
                setProjectDisplayID(event.target.value);
              }}
            >
              <option value="" disabled selected hidden>
                Select Token
              </option>
              <option>XTZ</option>
              <option>Kalam</option>
            </select> */}
          </div>
          <div className="swapscreen_maincontainer_tokencontainer">
            <div className="swapscreen_maincontainer_tokencontainer_left">
              <div className="flex flex-col">
                <div className="text-white text-subheading pb-2 ">Input</div>
                <input
                  type="number"
                  className="swapscreen_maincontainer_tokencontainer_input"
                  placeholder="0.0"
                />
              </div>
              <select
                className="swapscreen_maincontainer_tokencontainer_tokensdropdown"
                name="selectList"
                id="selectList"
                onChange={(event) => {
                  setProjectDisplayID(event.target.value);
                }}
              >
                {tokens
                  ? tokens.map((token, i) => {
                      return <option value={i}>{`${token}`}</option>;
                    })
                  : null}
              </select>
            </div>
            <div className="swapscreen_maincontainer_tokencontainer_right">
              <div>
                <div className="text-white text-subheading pb-2 ">Output</div>
                <input
                  className="swapscreen_maincontainer_tokencontainer_input"
                  placeholder="0.0"
                  type="number"
                />
              </div>
              <select
                className="swapscreen_maincontainer_tokencontainer_tokensdropdown"
                name="selectList"
                id="selectList"
                onChange={(event) => {
                  setProjectDisplayID(event.target.value);
                }}
              >
                {tokens
                  ? tokens.map((token, i) => {
                      return <option value={i}>{`${token}`}</option>;
                    })
                  : null}
              </select>
            </div>
          </div>

          <div className="swapscreen_maincontainer_innercontainer">
            <div className="swapscreen_maincontainer_innercontainer_left">
              <div>Input Dex Contract </div>
              <div>Output Dex Contract</div>
              <div>Fee - 0.3%</div>
              <div>Exchange Rate</div>
              <div>Slippage Tolerance</div>
            </div>
            <div className="swapscreen_maincontainer_innercontainer_right">
              <div className="flex flex-col justify-end">
                <div className="text-heading-2  text-gray-300 font-bold">
                  Equivalent USD Amount
                </div>
                <div className="text-subheading text-gray-200 font-medium">
                  500 USD
                </div>
              </div>
              <div className="swapscreen_maincontainer_innercontainer_swapbutton">
                Confirm Swap
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </article>
    </>
  );
}

export default SwapScreen;
