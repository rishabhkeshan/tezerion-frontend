import "./AssetsScreen.scss";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";

function TokenDetailsContainer({ tokenSelectedData }) {
  // useEffect(() => {
  //   displayProjectDetails();
  // }, [projectDisplayID, projectOverviewData])
  const [project, setProject] = useState({
    projectName: "Tezos",
    tokenTicker: "8 USD",
    derivativeID: "1 ꜩ",
    contractAddress: "40 ꜩ",
    projectDescription: "4000 ꜩ",
  });
  function abbreviateNumber(number) {
    let x = new BigNumber(number);
    x = x.toPrecision(8);
    x = new BigNumber(x);
    if (x > 1000000) return x.toExponential();
    else return x.toNumber();
  }
  return (
    <section className="tokendetailscontainer">
      <div className="tokendetailscontainer_title">DETAILS</div>
      <hr className="border-dark-200 px-2 h-2"></hr>
      <div className="tokendetailscontainer_innercontainer">
        <div className="flex justify-between">
          <div className="tokendetailscontainer_innercontainer_detailbox">
            <div className="tokendetailscontainer_innercontainer_detailbox_key">
              Token Name
            </div>
            <div className="tokendetailscontainer_innercontainer_detailbox_value">
              {tokenSelectedData.symbol}
            </div>
          </div>
          <div className="tokendetailscontainer_innercontainer_detailbox flex flex-col justify-start items-end">
            <div className="tokendetailscontainer_innercontainer_detailbox_key ">
              Contract Address
            </div>
            <div className="tokendetailscontainer_innercontainer_detailbox_value">
              {`${tokenSelectedData.contractAddress.substr(
                0,
                6
              )}...${tokenSelectedData.contractAddress.substr(-4)}`}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="tokendetailscontainer_innercontainer_detailbox">
            <div className="tokendetailscontainer_innercontainer_detailbox_key">
              Price (USD)
            </div>
            <div className="tokendetailscontainer_innercontainer_detailbox_value">
              {abbreviateNumber(tokenSelectedData.price)}
            </div>
          </div>
          <div className="tokendetailscontainer_innercontainer_detailbox flex flex-col justify-start items-end">
            <div className="tokendetailscontainer_innercontainer_detailbox_key ">
              TVL
            </div>
            <div className="tokendetailscontainer_innercontainer_detailbox_value">
              {abbreviateNumber(tokenSelectedData.tvl)}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="tokendetailscontainer_innercontainer_detailbox">
            <div className="tokendetailscontainer_innercontainer_detailbox_key">
              Balance
            </div>
            <div className="tokendetailscontainer_innercontainer_detailbox_value">
              {abbreviateNumber(tokenSelectedData.balance)}
            </div>
          </div>
          <div className="tokendetailscontainer_innercontainer_detailbox flex flex-col justify-start items-end">
            <div className="tokendetailscontainer_innercontainer_detailbox_key">
              Value(USD)
            </div>
            <div className="tokendetailscontainer_innercontainer_detailbox_value">
              {abbreviateNumber(tokenSelectedData.usdValue)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TokenDetailsContainer;
