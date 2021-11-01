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
import { InternalWalletApi } from "../../api/walletApi";

function AssetsScreen() {
  let internalWalletApi = new InternalWalletApi(
    "tz1gfArv665EUkSg2ojMBzcbfwuPxAvqPvjo",
    "mainnet"
  );

  const [tokenDisplayID, setTokenDisplayID] = useState(0);
  const [tokenData, setTokenData] = useState([]);
  useEffect(() => {
    loadTokenData();
  }, []);
  const loadTokenData = async () => {
    const accountDetails = await internalWalletApi.getWalletTokens();
    console.log(accountDetails);
    setTokenData(accountDetails);
  };

  const handleWalletConnection = (tezos, pkh) => {
    internalWalletApi = new InternalWalletApi(pkh, "mainnet");
    loadTokenData();
  };
  return (
    <>
      <article className="assetsscreen">
        <Header about swap handleWalletConnection={handleWalletConnection} />
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
                setTokenDisplayID(event.target.value);
              }}
            >
              {tokenData?.tokens
                ? tokenData.tokens.map((token, i) => {
                    return <option value={i}>{`${token.symbol}`}</option>;
                  })
                : null}
            </select>
          </div>
          {tokenData.tokens ? (
            <div className="assetsscreen_maincontainer_innercontainer">
              <div className="assetsscreen_maincontainer_topcontainer">
                <TokenPriceGraphContainer
                  tokenData={tokenData}
                  tokenDisplayID={tokenDisplayID}
                />
                {tokenData?.tokens[tokenDisplayID] ? (
                  <TokenDetailsContainer
                    tokenSelectedData={tokenData?.tokens[tokenDisplayID]}
                  />
                ) : null}
              </div>
              <div className="assetsscreen_maincontainer_bottomcontainer">
                <OtherAssetsTableContainer
                  tokenData={tokenData}
                  tokenDisplayID={tokenDisplayID}
                />
              </div>
            </div>
          ) : null}
        </section>
        <Footer />
      </article>
    </>
  );
}

export default AssetsScreen;
