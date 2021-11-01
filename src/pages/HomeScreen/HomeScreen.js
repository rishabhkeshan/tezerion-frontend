import "./HomeScreen.scss";

import NextIcon from "../../assets/next.svg";
import GlowCubeIllustration from "../../assets/GlowCube.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useState } from "react";
import { InternalWalletApi } from "../../api/walletApi";
import { WalletSwap } from "../../api/walletSwap";

function HomeScreen() {
  return (
    <article className="homescreen">
      <Header hiddenConnect about />
      <section className="homescreen_maincontainer">
        <div className="homescreen_maincontainer_herocontainer">
          <div className="homescreen_maincontainer_herocontainer_cname">
            Tezerion
          </div>
          <div className="homescreen_maincontainer_herocontainer_title">
            Your one stop defi asset management portal
          </div>
          <div className="homescreen_maincontainer_herocontainer_subtitle">
            Check your portfolio value now
          </div>
          <div className="homescreen_maincontainer_herocontainer_button">
            <Link
              to="/assets"
              className="homescreen_maincontainer_herocontainer_button_text"
            >
              Take Me in!
            </Link>
            <img
              className="homescreen_maincontainer_herocontainer_button_icon"
              src={NextIcon}
              alt="next icon"
            />
          </div>
          <img
            className="homescreen_maincontainer_herocontainer_blobglowcube"
            src={GlowCubeIllustration}
            alt="Glow Cube Illustration"
          />
        </div>
        <div className="homescreen_maincontainer_swapcontainer">
          <div className="homescreen_maincontainer_swapcontainer_text">
            Want to swap tokens?
          </div>
          <div className="homescreen_maincontainer_swapcontainer_button">
            <Link
              to="/swap"
              className="homescreen_maincontainer_swapcontainer_button_text"
            >
              Click Here
            </Link>
            <img
              className="homescreen_maincontainer_swapcontainer_button_icon"
              src={NextIcon}
              alt="next icon"
            />
          </div>
        </div>
      </section>
      <Footer />
    </article>
  );
}

export default HomeScreen;
