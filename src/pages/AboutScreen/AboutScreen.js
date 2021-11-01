import "./AboutScreen.scss";

import NextIcon from "../../assets/next.svg";
import TezosIndia from "../../assets/TezosIndia.svg";
import Hemanth from "../../assets/Hemanth.png";
import Rishabh from "../../assets/Rishabh.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import { InternalWalletApi } from "../../api/walletApi";
import { WalletSwap } from "../../api/walletSwap";

function AboutScreen() {
  return (
    <article className="aboutscreen">
      <Header swap assets hiddenConnect />
      <section className="aboutscreen_maincontainer">
        <div className="aboutscreen_maincontainer_herocontainer">
          <div className="aboutscreen_maincontainer_herocontainer_cname">
            About Us
          </div>
          {/* <div className="aboutscreen_maincontainer_herocontainer_title">
            Your one stop defi asset management portal on the Tezos ecosystem
          </div> */}
          <div className="aboutscreen_maincontainer_herocontainer_subtitle">
            It’s been more than 3 years since Tezos launched, one of the first
            PoS blockchains but it still lacks a place where one could easily
            invest, swap and see his token holdings. This is a major problem as
            people need to then run from dapps to dapps for their asset
            management. <strong>Tezerion</strong> is the solution.
          </div>
          <div className="flex justify-between pt-3">
            <div className="flex flex-col justify-center items-center">
              <img className="w-36 pb-2" src={Rishabh} alt="Rishabh" />
              <div className="font-bold text-caption-3 tablet:text-caption-1 laptop:text-paragraph-1">
                Rishabh Keshan
              </div>
              <div className="text-primary-purple-300 text-caption-4 tablet:text-caption-2 laptop:text-paragraph-2">
                TIF Fellow 2.0
              </div>
            </div>
            <div className="flex flex-col justify-center ml-8 tablet:ml-12 laptop:ml-16 items-center">
              <img className="w-36 pb-2" src={Hemanth} alt="Hemanth" />
              <div className="font-bold text-caption-3 tablet:text-caption-1 laptop:text-paragraph-1">
                Hemanth Krishna
              </div>
              <div className="text-primary-purple-300 text-caption-4 tablet:text-caption-2 laptop:text-paragraph-2">
                TIF Fellow 2.0
              </div>
            </div>
          </div>
          <img
            className="aboutscreen_maincontainer_herocontainer_blobglowcube"
            src={TezosIndia}
            alt="Tezos India"
          />
        </div>
      </section>
      <Footer />
    </article>
  );
}

export default AboutScreen;
