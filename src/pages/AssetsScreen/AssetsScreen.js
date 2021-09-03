import "./AssetsScreen.scss";

import NextIcon from "../../assets/next.svg";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Redirect from "../../assets/Redirect.svg";

import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import TokenPriceGraphContainer from "../../containers/AssetsScreen/TokenPriceGraphContainer";
import TokenDetailsContainer from "../../containers/AssetsScreen/TokenDetailsContainer";
import OtherAssetsTableContainer from "../../containers/AssetsScreen/OtherAssetsTableContainer";

function AssetsScreen() {

const [projectDisplayID, setProjectDisplayID] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [projectOverviewData, setProjectOverviewData] = useState(null);
  const [allProjectData, setAllProjectData] = useState([]);
    useEffect(() => {
      loadProjectData();
    }, []);
    const loadProjectData = async () => {
    const getChartData = (datasource) => {
      let charXAxis = [];
      let charYAxis = [];
      datasource.forEach((element) => {
        charXAxis.push(element.displayGraphDate);
        charYAxis.push(
          parseInt(element.totalSupply) / 10 ** parseInt(element.decimal)
        );
      });
     } };
  return (
    <>

        <article className="assetsscreen">
          <Header />
          <section className="assetsscreen_maincontainer">
            <div className="assetsscreen_maincontainer_titlecontainer">
              <div className="assetsscreen_maincontainer_titlecontainer_title">
                Assets
              </div>
              <select
                className="assetsscreen_maincontainer_titlecontainer_tokensdropdown"
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
              </select>
            </div>
            <div className="assetsscreen_maincontainer_innercontainer">
              <div className="assetsscreen_maincontainer_topcontainer">
                <TokenPriceGraphContainer
                  projectOverviewData={projectOverviewData}
                  projectDisplayID={projectDisplayID}
                />
                <TokenDetailsContainer
                  projectOverviewData={projectOverviewData}
                  projectDisplayID={projectDisplayID}
                />
              </div>
              <div className="assetsscreen_maincontainer_bottomcontainer">
                <OtherAssetsTableContainer
                  projectOverviewData={projectOverviewData}
                  projectDisplayID={projectDisplayID}
                />
              </div>
            </div>
          </section>
          <Footer />
        </article>
    </>
  );
}

export default AssetsScreen;
