import "./Header.scss";
import TezerionLogo from "../../assets/TezerionLogo.svg";
import LogoutIcon from "../../assets/logout.svg";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { useMetamask } from "../../metamaskReactHook/index";
import { useEffect, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { Link } from "react-router-dom";

function Header({
  hiddenNav,
  assets,
  swap,
  about,
  hiddenConnect,
  handleWalletConnection,
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const options = {
    name: "Tezerion",
    preferredNetwork: "granadanet",
    PERMISSION_REQUEST_SUCCESS: {
      handler: async (data) => {
        console.log("Wallet is connected:", data);
      },
    },
    OPERATION_REQUEST_SENT: {
      handler: async (data) => {
        console.log("Request sent:", data);
      },
    },
    OPERATION_REQUEST_SUCCESS: {
      handler: async (data) => {
        console.log("Request successful:", data);
        enqueueSnackbar("Request successful!");
      },
    },
    OPERATION_REQUEST_ERROR: {
      handler: async (data) => {
        console.log("Request error:", data);
        enqueueSnackbar("Request error!");
      },
    },
  };

  const [userAddress, setUserAddress] = useState(null);

  const connectWallet = async () => {
    const Tezos = new TezosToolkit("https://granadanet.smartpy.io/");
    const options = { name: "Tezerion" };
    const wallet = new BeaconWallet(options);
    await wallet.requestPermissions({ network: { type: "granadanet" } });
    const pkh = await wallet.getPKH();
    setUserAddress(pkh);
    Tezos.setWalletProvider(wallet);
    handleWalletConnection(Tezos, pkh);
  };
  return (
    <header className={`header z-40 ${"border-b border-dark-200 "}`}>
      <a href="/">
        <div>
          <img
            className={`header_logo`}
            src={TezerionLogo}
            alt="Tezerion logo"
          />
        </div>
      </a>
      {!hiddenNav && (
        <div className="header_navbar">
          {
            <>
              {" "}
              {swap ? (
                <>
                  {" "}
                  <Link to="/swap" className="header_navbar_text">
                    Swap
                  </Link>
                  <div className="header_navbar_gap"></div>
                </>
              ) : null}
              {assets ? (
                <>
                  {" "}
                  <Link to="/assets" className="header_navbar_text">
                    Assets
                  </Link>
                  <div className="header_navbar_gap"></div>
                </>
              ) : null}
              {about ? (
                <>
                  {" "}
                  <Link to="/about" className="header_navbar_text">
                    About
                  </Link>
                  <div className="header_navbar_gap"></div>
                </>
              ) : null}
            </>
          }
          {!hiddenConnect ? (
            userAddress ? (
              <div className="header_navbar_logoutbutton">
                <div className="header_navbar_logoutbutton_text">
                  {" "}
                  {`${userAddress.substr(0, 6)}...${userAddress.substr(-4)}`}
                </div>
                <img
                  className="header_navbar_logoutbutton_icon"
                  onClick={console.log("Hello")}
                  src={LogoutIcon}
                  alt="logout icon"
                />
              </div>
            ) : (
              <div className="header_navbar_button">
                <div
                  onClick={connectWallet}
                  className="header_navbar_button_text"
                >
                  Connect Wallet
                </div>
              </div>
            )
          ) : null}
        </div>
      )}{" "}
    </header>
  );
}

export default Header;
