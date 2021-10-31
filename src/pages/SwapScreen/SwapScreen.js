import "./SwapScreen.scss";

import NextIcon from "../../assets/next.svg";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import Redirect from "../../assets/Redirect.svg";

import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { WalletSwap } from "../../api/walletSwap";
import { useSnackbar } from "notistack";

function SwapScreen() {
  const walletSwapApi = new WalletSwap();
  const { enqueueSnackbar, _ } = useSnackbar();

  const [estimation, setEstimation] = useState(0.0);
  const [inputContract, setInputContract] = useState("");
  const [outputContract, setOutputContract] = useState("Kolibri");
  const [inputDex, setInputDex] = useState("");
  const [outputDex, setOutputDex] = useState(
    walletSwapApi.getTokenContract("Kolibri").contract
  );
  const [inputAmount, setInputAmount] = useState("");

  useEffect(() => {}, []);

  const successToast = (message) => {
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      variant: "success",
    });
  };

  const errorToast = (message) => {
    enqueueSnackbar(message, {
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "left",
      },
      variant: "error",
    });
  };

  const getEstimation = async (amount, contract) => {
    const results = await walletSwapApi.getEstimation(amount, contract);
    console.log(estimation);
    setEstimation(results.estimation);
  };

  const swapToken = async () => {
    const results = await walletSwapApi.swapTokens(inputAmount, outputContract);
    console.log(results);
    if (results.swapped) {
      successToast("Swap Successful");
      successToast("Transaction Hash: " + results.hash);
    } else {
      errorToast("Swap failed");
    }
  };

  const handleInput = (event) => {
    setInputAmount(event.target.value);
    if (event.target.value.length > 0) {
      if (inputDex !== "") {
        getEstimation(event.target.value, outputContract);
      }
    }
  };

  return (
    <>
      <article className="swapscreen">
        <Header assets about />
        <section className="swapscreen_maincontainer">
          <div className="swapscreen_maincontainer_titlecontainer">
            <div className="swapscreen_maincontainer_titlecontainer_title">
              Swap Details
            </div>
          </div>
          <div className="swapscreen_maincontainer_tokencontainer">
            <div className="swapscreen_maincontainer_tokencontainer_left">
              <div className="flex flex-col">
                <div className="text-white text-subheading pb-2 ">Input</div>
                <input
                  type="number"
                  className="swapscreen_maincontainer_tokencontainer_input"
                  placeholder="0.0"
                  onChange={handleInput}
                />
              </div>
              <select
                className="swapscreen_maincontainer_tokencontainer_tokensdropdown"
                name="selectList"
                id="selectList"
                onChange={(event) => {
                  console.log(event.target.value);
                  setInputContract(event.target.value);
                  const contract = walletSwapApi.getTokenContract(
                    event.target.value
                  );
                  setInputDex(contract.contract);
                }}
              >
                <option value="" disabled selected hidden>
                  Select Token
                </option>
                {walletSwapApi.swaps.map((swap) => {
                  return <option value={swap}>{swap}</option>;
                })}
              </select>
            </div>
            <div className="swapscreen_maincontainer_tokencontainer_right">
              <div>
                <div className="text-white text-subheading pb-2 ">Output</div>
                <input
                  className="swapscreen_maincontainer_tokencontainer_input"
                  placeholder={estimation}
                  type="number"
                  disabled={true}
                />
              </div>
              <select
                className="swapscreen_maincontainer_tokencontainer_tokensdropdown"
                name="selectList"
                id="selectList"
                onChange={(event) => {
                  setOutputContract(event.target.value);
                  const contract = walletSwapApi.getTokenContract(
                    event.target.value
                  );
                  setOutputDex(contract.contract);
                }}
              >
                {/* <option value="" disabled selected hidden>
                  Select Token
                </option> */}
                {/* {walletSwapApi.swaps.map((swap) => {
                  return <option value={swap}>{swap}</option>;
                })} */}
                <option value="Kolibri" selected>
                  {"Kolibri"}
                </option>
              </select>
            </div>
          </div>

          <div className="swapscreen_maincontainer_innercontainer">
            <div className="swapscreen_maincontainer_innercontainer_left">
              <div>Input Dex Contract - {inputDex}</div>
              <div>Output Dex Contract - {outputDex}</div>
              <div>Fee - 0.3%</div>
              <div>Exchange Rate - {estimation}</div>
              <div>Slippage Tolerance - 0.05%</div>
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
              <div
                className="swapscreen_maincontainer_innercontainer_swapbutton"
                onClick={swapToken}
              >
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
